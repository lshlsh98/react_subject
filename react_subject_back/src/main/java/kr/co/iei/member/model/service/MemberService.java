package kr.co.iei.member.model.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.vo.Member;
import kr.co.iei.member.model.vo.MemberLoginReqDto;
import kr.co.iei.member.model.vo.MemberSaveReqDto;

@Service
@Transactional
public class MemberService {
	
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private PasswordEncoder passwordEncorder;

	public Member create(MemberSaveReqDto request) {
		// 이미 가입되어 있는 이메일 검증
		String findEmail = memberDao.findByEmail(request.getEmail());
		if(Objects.equals(findEmail, request.getEmail())) {
			throw new IllegalArgumentException("이미 존재하는 이메일 입니다.");
		}
		
		Member newMember = new Member();
		newMember.setName(request.getName());
		newMember.setEmail(request.getEmail());
		newMember.setPassword(passwordEncorder.encode(request.getPassword()));
	
		int result = memberDao.save(newMember);
		
		Member member = memberDao.findMemberByEmail(request.getEmail());
		
		return member;
	}//

	public Member login(MemberLoginReqDto request) {
		Member member = memberDao.findMemberByEmail(request.getEmail());
		if(member == null) {
			throw new IllegalArgumentException("존재하지 않는 이메일 입니다.");
		}
		
		if(!passwordEncorder.matches(request.getPassword(), member.getPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}
		
		return member;
	}//

}
