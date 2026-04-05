package kr.co.iei.member.model.vo;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias("member")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Member {
	
	private Long id;
	private String name;
	private String email;
	private String password; 
	private Integer role;		// 1: 일반 2: 관리자		
}
