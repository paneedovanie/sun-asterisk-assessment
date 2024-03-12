import { z } from "zod";

export const CreateCommentInputSchema = z.object({
  content: z.string().trim().min(1, { message: "Required" }),
});
