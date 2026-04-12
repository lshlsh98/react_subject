package kr.co.iei.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.chat.model.service.ChatService;
import kr.co.iei.chat.model.vo.ChatRoomListResDto;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	// 그룹 채팅방 개설
	@PostMapping("/room/group/create")
	public ResponseEntity<?> createGroupRoom(@RequestParam String roomName){
		chatService.createGroupRoom(roomName);
		
		return ResponseEntity.ok().build();
	}//
	
	// 그룹 채팅 목록 조회
	@GetMapping("/room/group/list")
	public ResponseEntity<?> getGroupChatRooms(){
		List<ChatRoomListResDto> list = chatService.getGroupChatRooms();
		System.out.println(list);
		
		return ResponseEntity.ok(list);
	}//
	
	// 그룹 채팅방 참여
	@PostMapping("/room/group/{roomId}/join")
	public ResponseEntity<?> joinGroupChatRoom(@PathVariable Long roomId){
		chatService.addParticipantToGroupChat(roomId);
		
		return ResponseEntity.ok().build();
	}//

}













