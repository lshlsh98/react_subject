package kr.co.iei.subject.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectRequest {
	
	private Integer category;
	private Integer level;
	private Integer order;
	private String searchKey;
}
