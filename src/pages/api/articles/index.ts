// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ArticleService,
  UnauthorizedError,
  createApiResponse,
  getUserFromRequest,
} from "@/core";
import { ERequestMethod } from "@/types";

const articleService = new ArticleService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserFromRequest(req);
  await articleService.connect();
  switch (req.method) {
    case ERequestMethod.Get:
      createApiResponse(res, () => articleService.list());
      return;
    case ERequestMethod.Post:
      createApiResponse(
        res,
        async () => {
          if (!user) {
            throw new UnauthorizedError();
          }
          return articleService.create(req.body, user);
        },
        201
      );
      return;
    default:
      res.status(404).send("Not found");
  }
  await articleService.disconnect();
}
