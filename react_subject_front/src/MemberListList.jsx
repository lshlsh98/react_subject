import axios from "./utils/axios";
import styles from "./SubjectList.module.css";
import { useNavigate } from "react-router-dom";

const MemberListList = ({ subjectList }) => {
  const navigate = useNavigate();

  const startChat = (otherMemberId) => {
    // 기존의 채팅방이 있으면 return 받고, 없으면 새롭게 생성된 roomId return
    axios.post(``).then((res) => {
      const roomId = res.data;
      navigate(`/chatpage/${roomId}`);
    });
  };

  return (
    <div className={styles.subject_list_wrap}>
      <ul className={`${styles.subject_item} ${styles.title_ul}`}>
        <li className={styles.subject_no}>번호</li>
        <li className={styles.subject_title}>이름</li>
        <li className={styles.subject_instructor}>이메일</li>
        <li className={styles.subject_category}>채팅</li>
      </ul>
      {subjectList.map((subject) => (
        <ul key={subject.id} className={styles.subject_item}>
          <li className={styles.subject_no}>{subject.id}</li>
          <li className={styles.subject_title}>{subject.name}</li>
          <li className={styles.subject_instructor}>{subject.email}</li>
          <li className={styles.subject_category}>
            <button onClick={() => startChat(subject.id)}>채팅하기</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MemberListList;
