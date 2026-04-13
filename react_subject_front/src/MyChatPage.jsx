import { useEffect, useState } from "react";
import styles from "./MyChatPage.module.css";
import axios from "./utils/axios";
import { useNavigate } from "react-router-dom";

function MyChatPage() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/chat/my/rooms`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const enterChatRoom = (roomId) => {
    navigate(`/chatpage/${roomId}`);
  };

  const leaveChatRoom = (roomId) => {
    axios.delete(`/chat/room/group/${roomId}/leave`).then(() => {
      const newList = list.filter((c) => {
        return c.roomId !== roomId;
      });
      setList(newList);
    });
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>내 채팅 목록</h1>
      </header>
      <div className={styles.subject_list_wrap}>
        <ul className={`${styles.subject_item} ${styles.title_ul}`}>
          <li className={styles.subject_title}>채팅방 이름</li>
          <li className={styles.subject_instructor}>읽지 않은 메시지</li>
          <li className={styles.subject_category}>액션</li>
        </ul>
        {list.map((chat) => (
          <ul key={chat.roomId} className={styles.subject_item}>
            <li className={styles.subject_title}>{chat.roomName}</li>
            <li className={styles.subject_instructor}>{chat.unReadCount}</li>
            <li className={styles.subject_category}>
              <button
                onClick={() => {
                  enterChatRoom(chat.roomId);
                }}
              >
                입장
              </button>
              <button
                disabled={chat.isGroupChat === 1}
                onClick={() => leaveChatRoom(chat.roomId)}
              >
                나가기
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default MyChatPage;
