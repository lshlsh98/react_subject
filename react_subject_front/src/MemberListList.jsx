import styles from "./SubjectList.module.css";

const MemberListList = ({ subjectList }) => {
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
          <li className={styles.subject_category}></li>
        </ul>
      ))}
    </div>
  );
};

export default MemberListList;
