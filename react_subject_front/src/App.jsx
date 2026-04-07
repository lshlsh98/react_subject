import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Subject from "./Subject";
import "./App.css";

const App = () => {
  return (
    <div className="wrap">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/subject" element={<Subject />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
