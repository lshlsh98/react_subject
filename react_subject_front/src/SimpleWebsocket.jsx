import { useEffect, useRef, useState } from "react";
import styles from "./SimpleWebsocket.module.css";

const SimpleWebsocket = () => {
  /*
  WebSocket은 렌더링과 무관한 값
  state로 하면 → 변경될 때마다 리렌더링 발생
  값 유지 + 렌더링 영향 없음 = useRef
  */
  const ws = useRef(null); // 웹소켓 저장
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);
  const isUnmounting = useRef(false);

  const connectWebsocket = () => {
    ws.current = new WebSocket("ws://localhost:8989/connect");

    ws.current.onopen = () => {
      console.log("successfully connected");
    };

    ws.current.onmessage = (message) => {
      setMessages((prev) => [...prev, message.data]);
    };

    ws.current.onclose = () => {
      if (isUnmounting.current) {
        console.log("컴포넌트 종료로 인한 disconnect");
      } else {
        console.log("예상치 못한 disconnect");
      }
    };
  };

  const sendMessage = (e) => {
    e.preventDefault(); // form submit 기본 동작 막기

    if (ws.current && newMessage.trim() !== "") {
      ws.current.send(newMessage);
      setNewMessage("");
    }
  };

  useEffect(() => {
    connectWebsocket();

    return () => {
      isUnmounting.current = true;
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chat_card}>
      <h3>채팅</h3>
      <div className={styles.chat_box} ref={chatBoxRef}>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <form className={styles.chat_send} onSubmit={sendMessage}>
        <textarea
          className={styles.input_zone}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="채팅을 입력하세요"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 줄바꿈 막기
              sendMessage(e); // 전송
            }
          }}
        />
        <div className={styles.btn_zone}>
          <button type="submit">전송</button>
        </div>
      </form>
    </div>
  );
};

export default SimpleWebsocket;
