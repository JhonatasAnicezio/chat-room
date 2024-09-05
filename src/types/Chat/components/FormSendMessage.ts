import { z } from "zod";

export const formSendMessageSchema = z.object({
    message: z.string().min(1),
});

export type FormSendMessageSchema = z.infer<typeof formSendMessageSchema>;