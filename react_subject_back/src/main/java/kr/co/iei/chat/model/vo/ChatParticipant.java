package kr.co.iei.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatParticipant {
	
	private Long id;
	private Long chatRoomId;
	private Long memberId;
}
