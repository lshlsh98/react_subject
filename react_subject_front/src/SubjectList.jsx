import styles from "./SubjectList.module.css";

const SubjectList = ({ subjectList }) => {
  return (
    <div className={styles.subject_list_wrap}>
      <ul className={`${styles.subject_item} ${styles.title_ul}`}>
        <li className={styles.subject_no}>번호</li>
        <li className={styles.subject_title}>과목</li>
        <li className={styles.subject_instructor}>강사</li>
        <li className={styles.subject_category}>분류</li>
        <li className={styles.subject_level}>난이도</li>
        <li className={styles.subject_count}>정원</li>
      </ul>
      {subjectList.map((subject) => (
        <ul key={subject.subjectNo} className={styles.subject_item}>
          <li className={styles.subject_no}>{subject.subjectNo}</li>
          <li className={styles.subject_title}>{subject.subjectTitle}</li>
          <li className={styles.subject_instructor}>
            {subject.subjectInstructor}
          </li>
          <li className={styles.subject_category}>
            {subject.subjectCategory === 1
              ? "백엔드"
              : subject.subjectCategory === 2
                ? "프론트엔드"
                : "DB"}
          </li>
          <li className={styles.subject_level}>
            {subject.subjectLevel === 1
              ? "초급"
              : subject.subjectLevel === 2
                ? "중급"
                : "고급"}
          </li>
          <li className={styles.subject_count}>{subject.subjectCount}</li>
        </ul>
      ))}
    </div>
  );
};

export default SubjectList;
