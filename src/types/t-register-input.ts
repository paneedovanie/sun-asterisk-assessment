import { z } from "zod";
import { RegisterInputSchema } from "../schemas";

export type TRegisterInput = z.infer<typeof RegisterInputSchema>;
