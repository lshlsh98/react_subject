package kr.co.iei.chat.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReadStatus {

	private Long id;
	private Long messageId;
	private Long memberId;
	private Long chatRoomId;
	private Integer isRead;	// 0: 안읽음 1: 읽음
}
