import { unknown } from "zod";

export class BadRequestError extends Error {
  status = 400;

  constructor(public readonly data: unknown) {
    super("Bad request");
  }
}
