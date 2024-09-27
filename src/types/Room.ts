import { Message } from "./Message";

export interface Room {
    _id: string,
    name: string,
    subject: string[],
    createAt: Date,
    idAuthor: string,
    messages: Message[],
}