import { z } from "zod";

export const createRoomSchema = z.object({
    idAuthor: z.string(),
    name: z.string(),
    // imgUrl: z.string(),
    subjects: z.array(z.string()),
});

export type CreateRoomSchema = z.infer<typeof createRoomSchema>;