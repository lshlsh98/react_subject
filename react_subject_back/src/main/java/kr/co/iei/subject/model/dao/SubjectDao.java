package kr.co.iei.subject.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.subject.model.vo.Subject;
import kr.co.iei.subject.model.vo.SubjectRequest;

@Mapper
public interface SubjectDao {

	List<Subject> selectSubjectList(SubjectRequest request);
	

}
