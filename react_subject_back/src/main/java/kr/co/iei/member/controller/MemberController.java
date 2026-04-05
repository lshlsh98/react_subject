package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.member.model.vo.Member;
import kr.co.iei.member.model.vo.MemberLoginReqDto;
import kr.co.iei.member.model.vo.MemberSaveReqDto;

@RestController
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/create")
	public ResponseEntity<?> memberCreate(@RequestBody MemberSaveReqDto request){
		Member member = memberService.create(request);
		
		return ResponseEntity.ok(member.getId());
	}//
	
	@PostMapping("/doLogin")
	public ResponseEntity<?> doLogin(@RequestBody MemberLoginReqDto request){
		// email, password 검증
		Member member = memberService.login(request);
		
		// 일치할 경우 access 토큰 발행
		
		return null;
		
	}//

}
