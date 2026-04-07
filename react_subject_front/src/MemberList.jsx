import { useEffect, useState } from "react";
import styles from "./Subject.module.css";
import MemberListList from "./MemberListList";
import axios from "./utils/axios";

function MemberList() {
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
      <header className={styles.header}>
        <h1>회원 목록</h1>
      </header>
      <MemberListList subjectList={list} />
    </div>
  );
}

export default MemberList;
