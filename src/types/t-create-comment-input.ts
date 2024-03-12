import { z } from "zod";
import { CreateCommentInputSchema } from "../schemas";

export type TCreateCommentInput = z.infer<typeof CreateCommentInputSchema>;
