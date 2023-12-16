import express from "express";
import authController from "../controllers/authController";
import authAccess from "../middlewares/authAccess";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authAccess, authController.logout);

export default authRouter;
