import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
const app = express();

dotenv.config();

const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;

app.get("/", (req, res) => {
  res.send("여기는 쇼핑폼의 백엔드 페이지입니다");
});

mongoose
  .connect(mongodb!)
  .then(() => console.log("MongoDB에 성공적으로 연결되었습니다."))
  .catch(err => console.error("MongoDB 연결 실패:", err));

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트로 연결되었습니다.`);
});
