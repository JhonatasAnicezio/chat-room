import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const registerProfileSchema = z.object({
    displayName: z.string().min(3).max(20),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, 'O arquivo deve ter no máximo 2MB.')
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), 'A imagem deve ser do tipo JPEG ou PNG.'),
});

export type RegisterProfileSchema = z.infer<typeof registerProfileSchema>;
