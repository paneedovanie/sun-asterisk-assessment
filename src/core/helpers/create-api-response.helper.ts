import { NextApiResponse } from "next";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors";

export const createApiResponse = async (
  res: NextApiResponse,
  cb: () => void,
  status = 200
) => {
  try {
    res.status(status).json(await cb());
  } catch (err) {
    if (err instanceof BadRequestError) {
      res.status(err.status).json(err.data);
    } else if (
      err instanceof UnauthorizedError ||
      err instanceof NotFoundError ||
      err instanceof ForbiddenError
    ) {
      res.status(err.status).json(err.message);
    } else if (err instanceof Error) {
      res.status(500).json(err.message);
    } else {
      res.status(500).json("Internal server error");
    }
  }
};
