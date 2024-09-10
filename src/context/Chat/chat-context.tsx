import { Message } from "@/types/Message";
import { createContext } from "react";

interface ChatContext {
    messages: Message[],
    setMessages: (messages: Message[]) => void,
}

export const ChatContext = createContext({} as ChatContext);