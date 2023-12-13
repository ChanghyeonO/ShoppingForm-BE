import User from "../models/schemas/User";
import { setUserToken } from "../utils/jwt";
import { hashPassword } from "../utils/hashPassword";
import bcrypt from "bcrypt";

const UserService = {
  // 회원가입
  async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: number,
  ) {
    // 이메일 중복 검사
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("이미 사용 중인 이메일입니다.");
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 새 사용자 생성 및 저장
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
    });

    await user.save();

    return user;
  },

  // 로그인
  async login(email: string, password: string) {
    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // 토큰 생성
    const tokens = await setUserToken(user, false);

    return tokens;
  },

  // 로그아웃
  async logout(userId: string) {
    // 사용자의 리프레시 토큰 제거
    await User.updateOne({ _id: userId }, { refreshToken: "" });

    return { message: "로그아웃 성공" };
  },
};

export default UserService;
