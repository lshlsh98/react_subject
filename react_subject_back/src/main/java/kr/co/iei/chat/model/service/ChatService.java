package kr.co.iei.chat.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import kr.co.iei.subject.controller.SubjectController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.chat.model.dao.ChatDao;
import kr.co.iei.chat.model.vo.ChatMessage;
import kr.co.iei.chat.model.vo.ChatMessageDto;
import kr.co.iei.chat.model.vo.ChatParticipant;
import kr.co.iei.chat.model.vo.ChatRoom;
import kr.co.iei.chat.model.vo.ChatRoomAndMemberReqDto;
import kr.co.iei.chat.model.vo.ChatRoomListResDto;
import kr.co.iei.chat.model.vo.MyChatListResDto;
import kr.co.iei.chat.model.vo.ReadStatus;
import kr.co.iei.common.exception.NotFoundException;
import kr.co.iei.member.model.vo.Member;

@Service
@Transactional
public class ChatService {

    private final SubjectController subjectController;
	
	@Autowired
	private ChatDao chatDao;

    ChatService(SubjectController subjectController) {
        this.subjectController = subjectController;
    }

	public void saveMessage(Long roomId, ChatMessageDto chatMessageReqDto) {
		// 채팅방 조회
		ChatRoom chatRoom = chatDao.findChatRoomById(roomId);
		if (chatRoom == null) {
		    throw new NotFoundException("room cannot be found");
		}
		
		// 보낸 사람 조회
		Member sender = chatDao.findMemberByEmail(chatMessageReqDto.getSenderEmail());
		if (sender == null) {
		    throw new NotFoundException("member cannot be found");
		}
		
		// 메시지 저장
		Long chatMessageId = chatDao.getChatMessageId();
		ChatMessage chatMessage = new ChatMessage();
		chatMessage.setId(chatMessageId);
		chatMessage.setChatRoomId(chatRoom.getId());
		chatMessage.setMemberId(sender.getId());
		chatMessage.setContent(chatMessageReqDto.getMessage());
		chatDao.saveChatMessage(chatMessage);
		
		// 사용자 별로 읽음 여부 저장
		List<ChatParticipant> chatParticipants = chatDao.findChatParticipantAllById(chatRoom.getId());
		for(ChatParticipant c : chatParticipants) {
			ReadStatus readStatus = new ReadStatus();
			readStatus.setChatRoomId(chatRoom.getId());
			readStatus.setMemberId(c.getMemberId());
			readStatus.setMessageId(chatMessage.getId());
			if(sender.getId() == c.getMemberId()) {
				readStatus.setIsRead(1); // 읽음
			} else {
				readStatus.setIsRead(0); // 안읽음
			}
			
			chatDao.saveReadStatus(readStatus);
		}
	}//

	public void createGroupRoom(String roomName) {
		Member member = chatDao.findMemberByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(member == null) {
			throw new NotFoundException("member can not be found");
		}
		
		// 채팅방 생성
		Long chatRoomId = chatDao.getChatRoomId();
		ChatRoom chatRoom = ChatRoom.builder()
				.id(chatRoomId)
				.name(roomName)
				.isGroupChat(2)
				.build();
		chatDao.saveChatRoom(chatRoom);
		
		
		
		// 채팅 참여자로 개설자를 추가
		ChatParticipant chatParticipant = ChatParticipant.builder()
				.chatRoomId(chatRoom.getId())
				.memberId(member.getId())
				.build();
		
		chatDao.saveChatParticipant(chatParticipant);
	}//

	public List<ChatRoomListResDto> getGroupChatRooms() {
		List<ChatRoomListResDto> list = chatDao.getGroupChatRooms();
		
		return list;
	}//

	public void addParticipantToGroupChat(Long roomId) {
		// 채팅방 조회
		ChatRoom chatRoom = chatDao.findChatRoomById(roomId);
		if(chatRoom == null) {
			throw new NotFoundException("chatRoom can not be found");
		}
		
		// member 조회
		Member member = chatDao.findMemberByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(member == null) {
			throw new NotFoundException("member can not be found");
		}
		
		// 이미 참여자인지 검증
		ChatRoomAndMemberReqDto req = new ChatRoomAndMemberReqDto(chatRoom.getId(), member.getId());
		int isDupMember =  chatDao.findByChatRoomAndMember(req); // 0: 참여자X / 1: 참여자O
		if(isDupMember == 0) {
			addParticipantToRoom(chatRoom, member);
		}
	}//
	
	// chatParticipant 객체 생성 후 저장 (그룹채팅, 1:1채팅 모두 사용)
	public void addParticipantToRoom(ChatRoom chatRoom, Member member) {
		ChatParticipant chatParticipant = ChatParticipant.builder()
				.chatRoomId(chatRoom.getId())
				.memberId(member.getId())
				.build();
		
		chatDao.saveChatParticipant(chatParticipant);
	}//

	public List<ChatMessageDto> getChatHistory(Long roomId) {
		// 내가 해당 채팅방의 참여자가 아닐 경우 에러
		ChatRoom chatRoom = chatDao.findChatRoomById(roomId);
		if(chatRoom == null) {
			throw new NotFoundException("chatRoom can not be found");
		}
				
		Member member = chatDao.findMemberByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(member == null) {
			throw new NotFoundException("member can not be found");
		}
		
		List<ChatParticipant> chatParticipants = chatDao.findChatParticipantAllById(chatRoom.getId());
		boolean check = false;
		for(ChatParticipant c : chatParticipants) {
			if(c.getMemberId().equals(member.getId())) {
				check = true;
			}
		}
		if(!check) {
			throw new IllegalArgumentException("본인이 속하지 않은 채팅방 입니다.");
		}
		
		// 본인이 속한 채팅방의 경우 history 반환
		List<ChatMessageDto> list = chatDao.findByChatRoomId(chatRoom.getId());
				
		return list;
	}//

	public boolean isRoomParticipant(String email, Long roomId) {
		ChatRoom chatRoom = chatDao.findChatRoomById(roomId);
		if(chatRoom == null) {
			throw new NotFoundException("chatRoom can not be found");
		}
				
		Member member = chatDao.findMemberByEmail(email);
		if(member == null) {
			throw new NotFoundException("member can not be found");
		}
		
		List<ChatParticipant> chatParticipants = chatDao.findChatParticipantAllById(chatRoom.getId());
		for(ChatParticipant c : chatParticipants) {
			if(c.getMemberId().equals(member.getId())) {
				return true;
			}
		}
		
		return false;
	}//

	public void messageRead(Long roomId) {
		ChatRoom chatRoom = chatDao.findChatRoomById(roomId);
		if(chatRoom == null) {
			throw new NotFoundException("chatRoom can not be found");
		}
				
		Member member = chatDao.findMemberByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(member == null) {
			throw new NotFoundException("member can not be found");
		}
		
		ChatRoomAndMemberReqDto req = new ChatRoomAndMemberReqDto(chatRoom.getId(), member.getId());
		chatDao.updateIsRead(req);
		
	}//

	public List<MyChatListResDto> getMyChatRooms() {
		Member member = chatDao.findMemberByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(member == null) {
			throw new NotFoundException("member can not be found");
		}
		
		List<MyChatListResDto> MyChatListResDtos = chatDao.getMyChatRooms(member.getId());
		for(MyChatListResDto d :  MyChatListResDtos) {
			ChatRoomAndMemberReqDto req = new ChatRoomAndMemberReqDto(d.getRoomId(), member.getId());
			Long count = chatDao.getCountIsReadZero(req);
			d.setUnReadCount(count == null ? 0 : count / 2); // 왜인지 모르겠지만 똑같은게 2번 찍힘
		}
		
			
		return MyChatListResDtos;
	}//
}










