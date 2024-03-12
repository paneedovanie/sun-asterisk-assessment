// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createApiResponse,
  getUserFromRequest,
  UnauthorizedError,
} from "@/core";
import { ERequestMethod } from "@/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case ERequestMethod.Get:
      createApiResponse(res, () => {
        const user = getUserFromRequest(req);
        if (!user) {
          throw new UnauthorizedError();
        }

        return user;
      });
      return;
    default:
      res.status(404).send("Not found");
  }
}
