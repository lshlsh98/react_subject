package kr.co.iei.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.common.auth.JwtTokenProvider;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.member.model.vo.Member;
import kr.co.iei.member.model.vo.MemberListResDto;
import kr.co.iei.member.model.vo.MemberLoginReqDto;
import kr.co.iei.member.model.vo.MemberSaveReqDto;

@RestController
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
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
		String jwtToken = jwtTokenProvider.createToken(member.getEmail(), member.getRole());
		
		Map<String, Object> loginInfo = new HashMap<>();
		loginInfo.put("id", member.getId());
		loginInfo.put("token", jwtToken);
		
		loginInfo.put("email", member.getEmail());
		loginInfo.put("name", member.getName());
		
		return ResponseEntity.ok(loginInfo);
	}//
	
	@GetMapping("/list")
	public ResponseEntity<?> memberList(){
		
		List<MemberListResDto> dtos = memberService.findAll();
		
		return ResponseEntity.ok(dtos);
	}//

}
