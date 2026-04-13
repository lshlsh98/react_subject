import { useEffect, useRef, useState } from "react";
import styles from "./SimpleWebsocket.module.css";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import useAuthStore from "./utils/useAuthStore";
import { useParams } from "react-router-dom";
import axios from "./utils/axios";

const StompChatPage = () => {
  /*
  WebSocket은 렌더링과 무관한 값
  state로 하면 → 변경될 때마다 리렌더링 발생
  값 유지 + 렌더링 영향 없음 = useRef
  */
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);
  const stompClient = useRef(null);
  const token = useAuthStore((state) => state.token);
  const senderEmail = useAuthStore((state) => state.email);
  const subscriptionRef = useRef(null);
  const { roomId } = useParams();

  const connectWebsocket = () => {
    if (stompClient.current?.active) return;

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${import.meta.env.VITE_BACKSERVER}/connect`),

      reconnectDelay: 5000,

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe(); // 중복 방지
        }

        subscriptionRef.current = client.subscribe(
          `/topic/${roomId}`,
          (message) => {
            let parseMessage;
            try {
              parseMessage = JSON.parse(message.body);
            } catch (e) {
              parseMessage = { message: message.body };
            }

            setMessages((prev) => [...prev, parseMessage]);
          },
          {
            Authorization: `Bearer ${token}`, // subscribe 할 때도 토큰
          },
        );
      },
    });

    client.activate();
    stompClient.current = client;
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault(); // form submit 기본 동작 막기

    if (
      stompClient.current &&
      stompClient.current.connected &&
      newMessage.trim() !== ""
    ) {
      const obj = {
        senderEmail: senderEmail,
        message: newMessage,
      };
      stompClient.current.publish({
        destination: `/publish/${roomId}`,
        body: JSON.stringify(obj),
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!token) return;

    axios.get(`/chat/history/${roomId}`).then((res) => {
      setMessages(res.data);
    });

    connectWebsocket();

    return () => {
      axios.post(`/chat/room/${roomId}/read`);

      subscriptionRef.current?.unsubscribe();
      stompClient.current?.deactivate();
    };
  }, [token]);

  return (
    <div className={styles.chat_card}>
      <h3>채팅</h3>
      <div className={styles.chat_box} ref={chatBoxRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.chat_message} ${
              m.senderEmail === senderEmail ? styles.sent : styles.received
            }`}
          >
            <strong>{m.senderEmail}: </strong> {m.message}
          </div>
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

export default StompChatPage;
