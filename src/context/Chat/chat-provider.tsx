'use client'
import React, { useEffect, useState } from "react";
import { ChatContext } from "./chat-context";
import { socket } from "@/service/socket";
import { Message } from "@/types/Message";

export default function ChatProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on('message', (data: Message[]) => {
            setMessages(data);
        })
    }, []);

    const value = {
        messages,
        setMessages,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}