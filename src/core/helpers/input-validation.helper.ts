import { z } from "zod";
import { BadRequestError } from "../errors";

export const inputValidation = (schema: z.AnyZodObject, data: unknown) => {
  const result = schema.safeParse(data);
  if ("error" in result) {
    throw new BadRequestError(result.error?.flatten());
  }
};
