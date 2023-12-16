import { Request, Response } from "express";
import authService from "../services/authService";

const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name, phoneNumber } = req.body;
      const user = await authService.signup(email, password, name, phoneNumber);
      res.status(201).json({ message: "회원가입 성공", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "서버 오류 발생" });
      }
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const tokens = await authService.login(email, password);
      res.status(200).json({ message: "로그인 성공", tokens });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "서버 오류 발생" });
      }
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await authService.logout(email);
      res.status(200).json({ message: "로그아웃 성공" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "서버 오류 발생" });
      }
    }
  },
};

export default authController;
