// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthService, createApiResponse } from "@/core";
import { ERequestMethod } from "@/types";

const authService = new AuthService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authService.connect();
  switch (req.method) {
    case ERequestMethod.Post:
      createApiResponse(res, () => authService.register(req.body), 201);
      return;
    default:
      res.status(404).send("Not found");
  }
  await authService.disconnect();
}
