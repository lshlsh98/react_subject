import { useEffect, useState } from "react";
import styles from "./Subject.module.css";
import SubjectList from "./SubjectList";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import BasicSelect from "./BasicSelect";

function Subject() {
  const [subjectList, setSubjectList] = useState([]);

  const [category, setCategory] = useState(0); // 0: 모든, 1: 백, 2: 프론트, 3: DB
  const [level, setLevel] = useState(0); // 0: 모든, 1, 초급, 2: 중급, 3: 고급
  const [order, setOrder] = useState(0); // 0: 작성순, 2: 난이도 오름, 3: 난이도 내림, 4: 수강인원 오름, 5: 수강인원 내림
  const [keyword, setKeyword] = useState(""); // 인풋용
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKSERVER}/subjects?category=${category}&level=${level}&order=${order}&searchKey=${searchKey}`,
      )
      .then((res) => {
        setSubjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, level, order, searchKey]);

  return (
    <div>
      <header className={styles.header}>
        <h1>강의 목록</h1>
      </header>
      <div className={styles.check_wrap}>
        <div>
          <form
            className={styles.keyword_wrap}
            onSubmit={(e) => {
              e.preventDefault();
              setSearchKey(keyword);
            }}
          >
            <input
              className={styles.input}
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <button type="submit" className={styles.search_btn}>
              <SearchIcon />
            </button>
          </form>
        </div>
        <div className={styles.select_wrap}>
          {/* <select
            className={styles.select}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value={0}>카테고리</option>
            <option value={1}>백엔드</option>
            <option value={2}>프론드</option>
            <option value={3}>DB</option>
          </select>

          <select
            className={styles.select}
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <option value={0}>난이도</option>
            <option value={1}>초급</option>
            <option value={2}>중급</option>
            <option value={3}>고급</option>
          </select>

          <select
            className={styles.select}
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value={0}>작성순</option>
            <option value={1}>쉬운순</option>
            <option value={2}>어려운순</option>
            <option value={3}>인원 적은순</option>
            <option value={4}>인원 많은순</option>
          </select> */}
          <BasicSelect
            sta={category}
            setSta1={setCategory}
            list={["카테고리", "백엔드", "프론트", "DB"]}
          />

          <BasicSelect
            sta={level}
            setSta1={setLevel}
            list={["난이도", "초급", "중급", "고급"]}
          />

          <BasicSelect
            sta={order}
            setSta1={setOrder}
            list={["작성순", "쉬운순", "어려운순", "적은순", "많은순"]}
          />

          <RefreshIcon
            className={styles.refresh_icon}
            sx={{ fontSize: 30 }}
            onClick={() => {
              setCategory(0);
              setLevel(0);
              setOrder(0);
              setSearchKey("");
              setKeyword("");
            }}
          />
        </div>
      </div>
      <SubjectList subjectList={subjectList} />
    </div>
  );
}

export default Subject;
