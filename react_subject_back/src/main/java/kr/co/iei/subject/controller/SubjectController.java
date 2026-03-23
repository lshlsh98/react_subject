package kr.co.iei.subject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.subject.model.service.SubjectService;
import kr.co.iei.subject.model.vo.Subject;
import kr.co.iei.subject.model.vo.SubjectRequest;

@CrossOrigin("*")
@RestController
@RequestMapping("/subjects")
public class SubjectController {
	
	@Autowired
	private SubjectService subjectService;
	
	@GetMapping
	public ResponseEntity<?> selectSubjectList(@ModelAttribute SubjectRequest request){
		List<Subject> list = subjectService.selectSubjectList(request);
		
		System.out.println(request);
		
		return ResponseEntity.ok(list);
	}//
}
