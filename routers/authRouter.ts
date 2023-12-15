import express from "express";

import authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;