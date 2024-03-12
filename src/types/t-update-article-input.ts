import { z } from "zod";
import { UpdateArticleInputSchema } from "../schemas";

export type TUpdateArticleInput = z.infer<typeof UpdateArticleInputSchema>;
