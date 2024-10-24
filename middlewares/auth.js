import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel.js";

export async function authenticator(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Login First",
      });
    }

    const decode = jwt.verify(token, process.env.CODE);

    req.user = await userModel.findById(decode._id);

    next();
  } catch (error) {
    console.log(error);
  }
}
