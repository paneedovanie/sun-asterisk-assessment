import { z } from "zod";

export const LoginInputSchema = z.object({
  email: z.string().email().trim().min(1, { message: "Required" }),
  password: z.string().trim().min(1, { message: "Required" }),
});
