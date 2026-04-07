import { useState } from "react";
import styles from "./Join.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputMember = (e) => {
    const newMember = { ...member, [e.target.name]: e.target.value };
    setMember(newMember);
  };

  const joinMember = () => {
    axios
      .post(`${import.meta.env.VITE_BACKSERVER}/member/create`, member)
      .then((res) => {
        navigate("/member/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.content_wrap}>
      <h3 className="page-title">회원 가입</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          joinMember();
        }}
      >
        <div className={styles.input_wrap}>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            name="email"
            id="email"
            value={member.email}
            onChange={inputMember}
          />
        </div>
        <div className={styles.input_wrap}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={member.password}
            onChange={inputMember}
          />
        </div>
        <div className={styles.input_wrap}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            value={member.name}
            onChange={inputMember}
          />
        </div>
        <button type="submit" className={styles.btn}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Join;
