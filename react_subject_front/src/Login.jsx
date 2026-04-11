window.global = window;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./utils/useAuthStore";
import axios from "axios";
import styles from "./Join.module.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [member, setMember] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const inputMember = (e) => {
    const newMember = { ...member, [e.target.name]: e.target.value };
    setMember(newMember);
  };

  const doLogin = () => {
    axios
      .post(`${import.meta.env.VITE_BACKSERVER}/member/doLogin`, member)
      .then((res) => {
        const role = jwtDecode(res.data.token).role;
        const email = jwtDecode(res.data.token).sub;
        console.log(`role: ${role}, email: ${email}`);
        login(res.data);
        // axios.defaults.headers.common["Authorization"] = newData.token;
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3 className="page-title">로그인</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doLogin();
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
        <button type="submit" className={styles.btn}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
