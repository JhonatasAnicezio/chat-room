import { z } from "zod";

export const authEmailSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type AuthEmailSchema = z.infer<typeof authEmailSchema>;