package kr.co.iei.subject.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.subject.model.dao.SubjectDao;
import kr.co.iei.subject.model.vo.Subject;
import kr.co.iei.subject.model.vo.SubjectRequest;

@Service
public class SubjectService {
	
	@Autowired
	private SubjectDao subjectDao;

	public List<Subject> selectSubjectList(SubjectRequest request) {
		
		
		
		List<Subject> list = subjectDao.selectSubjectList(request);
		
		return list;
	}//
	
}
