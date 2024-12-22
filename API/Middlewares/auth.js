import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) {
    return res.status(401).json({ message: "Login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "!@#$%^&*()");
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  console.log("Token:", token);
  console.log("Decoded:", decoded);
  console.log("User ID:", decoded?.userId);
};
