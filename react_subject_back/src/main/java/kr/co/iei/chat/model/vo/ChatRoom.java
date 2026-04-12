package kr.co.iei.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
	
	private Long id;
	private String name;
	private Integer isGroupChat;	// 1: 그룹X / 2: 그룹O
}
