import { z } from "zod";

export const formSendMessageSchema = z.object({
    message: z.string(), 
});

export type FormSendMessageSchema = z.infer<typeof formSendMessageSchema>;