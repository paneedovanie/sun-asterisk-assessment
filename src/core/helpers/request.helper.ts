import { NextApiRequest } from "next";
import { tokenDecode } from "./token.helper";
import { AuthService } from "../services";

export const getUserFromRequest = async (req: NextApiRequest) => {
  const authService = new AuthService();
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const accessToken = authorization.split(" ")[1];
      const decoded = tokenDecode(accessToken);
      return authService.single(decoded.userId);
    }
  } catch {
    return null;
  }
  await authService.disconnect();

  return null;
};
