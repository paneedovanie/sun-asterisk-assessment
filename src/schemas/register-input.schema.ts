import { z } from "zod";

export const RegisterInputSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  email: z.string().email().trim().min(1, { message: "Required" }),
  password: z.string().trim().min(1, { message: "Required" }),
});
