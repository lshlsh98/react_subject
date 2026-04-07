import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "./utils/useAuthStore";

const Header = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const id = useAuthStore((state) => state.id);

  const doLogout = () => {
    logout();
    // delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <h3
          className={styles.title}
          onClick={() => {
            navigate("/");
          }}
        >
          CHAT 서비스
        </h3>

        <ul className={styles.nav}>
          <li
            onClick={() => {
              navigate("/member/list");
            }}
          >
            회원 목록
          </li>
          <li
            onClick={() => {
              navigate("/groupchatting/list");
            }}
          >
            채팅방 목록
          </li>
        </ul>

        <ul className={styles.nav}>
          {id ? (
            <>
              <li
                onClick={() => {
                  navigate("/my/chat/page");
                }}
              >
                MyChatPage
              </li>
              <li onClick={doLogout}>로그아웃</li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  navigate("/member/login");
                }}
              >
                로그인
              </li>
              <li
                onClick={() => {
                  navigate("/member/create");
                }}
              >
                회원가입
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
