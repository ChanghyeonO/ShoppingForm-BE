import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import configurePassport from "./passport";
import cors from "cors";
import authRouter from "./routers/authRouter";

const app = express();

dotenv.config();

const port = process.env.PORT || 4000;
const mongodb = process.env.MONGODB_URI;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);

app.get("/", (req, res) => {
  res.send("여기는 쇼핑폼의 백엔드 페이지입니다");
});

// Passport 초기화
app.use(passport.initialize());
configurePassport(passport);

app.use("/api", authRouter);

mongoose
  .connect(mongodb!)
  .then(() => console.log("MongoDB에 성공적으로 연결되었습니다."))
  .catch(error => console.error("MongoDB 연결 실패:", error));

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트로 연결되었습니다.`);
});
