import { useEffect, useState } from "react";
import styles from "./Subject.module.css";
import MemberListList from "./MemberListList";
import axios from "./utils/axios";

function GroupChatList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`/member/list`)
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h1>회원 목록</h1>
      </div>
      <div className={styles.subject_list_wrap}>
        <ul className={`${styles.subject_item} ${styles.title_ul}`}>
          <li className={styles.subject_no}>번호</li>
          <li className={styles.subject_title}>이름</li>
          <li className={styles.subject_instructor}>이메일</li>
          <li className={styles.subject_category}>채팅</li>
        </ul>
        {list.map((item) => (
          <ul key={subject.id} className={styles.subject_item}>
            <li className={styles.subject_no}>{subject.id}</li>
            <li className={styles.subject_title}>{subject.name}</li>
            <li className={styles.subject_instructor}>{subject.email}</li>
            <li className={styles.subject_category}></li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default GroupChatList;
