import { z } from "zod";

export const UpdateArticleInputSchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  content: z.string().trim().min(1, { message: "Required" }),
});
