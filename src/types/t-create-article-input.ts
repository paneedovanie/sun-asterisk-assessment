import { z } from "zod";
import { CreateArticleInputSchema } from "../schemas";

export type TCreateArticleInput = z.infer<typeof CreateArticleInputSchema>;
