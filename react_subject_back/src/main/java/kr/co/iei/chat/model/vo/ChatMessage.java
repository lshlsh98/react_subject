package kr.co.iei.chat.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Alias("chatMessage")
public class ChatMessage {
	
	private Long id;
	private Long chatRoomId;
	private Long memberId;
	private String content;
}
