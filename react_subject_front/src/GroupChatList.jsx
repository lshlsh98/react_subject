import { useEffect, useState } from "react";
import styles from "./GroupChatList.module.css";
import axios from "./utils/axios";
import { useNavigate } from "react-router-dom";

const GroupChatList = () => {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");
  const [reLoad, setReLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/chat/room/group/list`)
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reLoad]);

  const joinChatRoom = (roomId) => {
    axios
      .post(`/chat/room/group/${roomId}/join`)
      .then((res) => {
        navigate(`/chatpage/${roomId}`);
      })
      .catch((err) => {});
  };

  const showCreateRoomModal = () => {
    setIsOpen(true);
  };

  const createChatRoom = () => {
    axios
      .post(`/chat/room/group/create?roomName=${roomTitle}`, null)
      .then((res) => {
        setIsOpen(false);
        setRoomTitle("");
        setReLoad((prev) => !prev);
      });
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>채팅방 목록</h1>
        <div>
          <button onClick={showCreateRoomModal}>채팅방 생성</button>
          {isOpen && (
            <div className={styles.modal_wra}>
              <h3>채팅방 생성</h3>
              <input
                type="text"
                value={roomTitle}
                onChange={(e) => {
                  setRoomTitle(e.target.value);
                }}
              />
              <button onClick={createChatRoom}>확인</button>
              <button onClick={() => setIsOpen(false)}>닫기</button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.subject_list_wrap}>
        <ul className={`${styles.subject_item} ${styles.title_ul}`}>
          <li className={styles.subject_no}>번호</li>
          <li className={styles.subject_title}>제목</li>
          <li className={styles.subject_category}>채팅</li>
        </ul>
        {list.map((item) => (
          <ul key={item.roomId} className={styles.subject_item}>
            <li className={styles.subject_no}>{item.roomId}</li>
            <li className={styles.subject_title}>{item.roomName}</li>
            <li className={styles.subject_category}>
              <button
                onClick={() => {
                  joinChatRoom(item.roomId);
                }}
              >
                참여하기
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default GroupChatList;
