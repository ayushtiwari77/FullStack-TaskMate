import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

export function sendHello(req, res) {
  return res.send("server is working fine");
}

//register functionality
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.find({ email: email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.CODE);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "ban gya",
    });
  } catch (error) {
    next(error);
  }
}

//login functionality
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "email or password is wrong",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("email or password is wrong", 401));
      // res.status(401).json({
      //   success: false,
      //   message: "email or password is wrong",
      // });
    }

    const token = jwt.sign({ _id: user._id }, process.env.CODE);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: `welcome back ${user.name}`,
    });
  } catch (error) {
    next(error);
  }
}

//logout functionality
export function logout(req, res) {
  // res.cookie("token", "", {
  //   expires: new Date(Date.now()),
  //   sameSite: "none",
  //   secure: true,
  // });
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "successfully logout",
  });
}
