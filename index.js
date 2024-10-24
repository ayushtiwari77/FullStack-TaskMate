import express from "express";
import { config } from "dotenv";
import { connectDB } from "./Data/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";
import { errorSolver } from "./middlewares/error.js";
import cors from "cors";

//creating server
const app = express();

//configuring env file
config({
  path: "./data/config.env",
});

//connecting database
connectDB();

//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);
app.use("/taskmate/api/v1", userRouter);
app.use("/taskmate/api/v1", taskRouter);

//using in-built express error handler
app.use(errorSolver);

//listening to server
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
