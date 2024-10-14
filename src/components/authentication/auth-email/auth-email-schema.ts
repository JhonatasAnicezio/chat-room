import { z } from "zod";

export const authEmailSchema = z.object({
    email: z.string()
        .email({ message: "Por favor, insira um endereço de e-mail válido." }),
    password: z.string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export type AuthEmailSchema = z.infer<typeof authEmailSchema>;
