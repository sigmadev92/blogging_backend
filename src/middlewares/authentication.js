import { JWT_SECRET_KEY } from "../config/env.js";
import CustomError from "./handleError.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.blog_token;

  if (!token) {
    return next(new CustomError(403, "Credentials Missing"));
  }

  const user = jwt.verify(token, JWT_SECRET_KEY);
  if (!user) {
    return next(new CustomError(403, "Invalid or Expired Token"));
  }
  req.USER = { ...user, iat: "", exp: "" };
  return next();
};

const isAuthenticated = (req, res, next) => {
  req.USER = null;
  const token = req.cookies.blog_token;

  if (!token) {
    return next();
  }

  const user = jwt.verify(token, JWT_SECRET_KEY);
  if (!user) {
    return next();
  }
  req.USER = { ...user, iat: "", exp: "" };
  next();
};

const protectExposed = (req, res, next) => {
  const token = req.cookies.blog_token;
  if (!token) {
    return next();
  }

  const user = jwt.verify(token, JWT_SECRET_KEY);
  if (!user) {
    return next();
  }

  next(new CustomError(400, "You are already logged in."));
};
export { authMiddleware, protectExposed, isAuthenticated };
