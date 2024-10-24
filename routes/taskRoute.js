import express from "express";
import {
  all,
  createTask,
  deleteTask,
  completed,
} from "../controllers/tasks.js";
import { authenticator } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter
  .post("/create", authenticator, createTask)
  .get("/all", authenticator, all)
  .put("/completed/:id", authenticator, completed)
  .delete("/delete/:id", authenticator, deleteTask);

export default taskRouter;
