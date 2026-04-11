import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import MainPage from "./MainPage";
import Subject from "./Subject";
import "./App.css";
import Join from "./Join";
import Login from "./Login";
import MemberList from "./MemberList";
import SimpleWebsocket from "./SimpleWebsocket";
import StompChatPage from "./StompChatPage";

const App = () => {
  // 새로고침 시 일어나는 동작
  // useEffect(() => {
  //   axios.defaults.headers.common["Authorization"] = token;
  // }, []);

  return (
    <div className="wrap">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/member/create" element={<Join />} />
          <Route path="/member/login" element={<Login />} />
          <Route path="/member/list" element={<MemberList />} />
          <Route path="/simple/chat" element={<SimpleWebsocket />} />
          <Route path="/chatpage" element={<StompChatPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
