import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export const tokenEncode = (data: string | object | Buffer) => {
  return jwt.sign(data, JWT_SECRET);
};

export const tokenDecode = (token: string): { userId: number } => {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
};
