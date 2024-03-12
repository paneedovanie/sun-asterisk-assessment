import { z } from "zod";
import { LoginInputSchema } from "../schemas";

export type TLoginInput = z.infer<typeof LoginInputSchema>;
