import { z } from "zod";

export const editProfileSchema = z.object({
    displayName: z.string().min(3).max(20),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
