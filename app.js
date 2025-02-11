const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

app.set("view engine", "ejs");
app.set("views", "./views");

// 이동 페이지 (비밀번호찾기, 이메일찾기, 회원가입)
app.get("/searchPW", (req, res) =>{
  res.render("searchPW");
});
app.get("/searchEMAIL", (req, res) =>{
  res.render("searchEMAIL");
});
app.get("/join", (req, res) =>{
  res.render("join");
});

// 우선 회원가입(join) 페이지로 이동해 확인 V
// 메인(login) 페이지로 이동
app.get("/", (req, res) => {
  res.render("login");
});

let data = []; // 로컬스토리지 데이터 저장하기 위한 배열 설정

// 로그인
app.get("/getForm", (req, res) => {
  const searched = req.query;
  res.render("login", { title: 'get 요청결과', userinfo:searched });
});

// 회원가입
app.post("/postForm", (req, res) =>{
  data.push(req.body);
  res.render("join", {title: 'post 요청결과', userinfo:data});
});

// 저장된 사용자 목록 JSON 형태로 반환 (회원가입, 로그인)
app.get("/userinfo", (req, res) =>{
  res.json(data);
});

// 로그인 성공 시 보여줄 페이지
app.get("/loginCheck", (req, res) => {
  res.render("loginCheck"); 
});

app.listen(port, () => {
  console.log(`서버 실행 ${port}`);
});