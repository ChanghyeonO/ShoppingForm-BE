import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("여기는 쇼핑폼의 백엔드 페이지입니다");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
