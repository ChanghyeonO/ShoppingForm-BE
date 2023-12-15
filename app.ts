import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter";

const app = express();

dotenv.config();

const port = process.env.PORT || 4000;
const mongodb = process.env.MONGODB_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("여기는 쇼핑폼의 백엔드 페이지입니다");
});

app.use("/api", authRouter);

mongoose
  .connect(mongodb!)
  .then(() => console.log("MongoDB에 성공적으로 연결되었습니다."))
  .catch(err => console.error("MongoDB 연결 실패:", err));

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트로 연결되었습니다.`);
});
