import { z } from "zod";

export const registerProfileSchema = z.object({
    displayName: z.string().min(3).max(20),
});

export type RegisterProfileSchema = z.infer<typeof registerProfileSchema>;
