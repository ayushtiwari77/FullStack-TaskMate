import express from "express";
import { sendHello, register, login, logout } from "../controllers/users.js";

const userRouter = express.Router();

userRouter
  .get("/", sendHello)
  .post("/register", register)
  .post("/login", login)
  .get("/logout", logout);

export default userRouter;
