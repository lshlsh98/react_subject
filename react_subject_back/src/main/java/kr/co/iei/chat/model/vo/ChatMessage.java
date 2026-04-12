package kr.co.iei.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
	
	private Long id;
	private Long chatRoomId;
	private Long memberId;
	private String content;
}
