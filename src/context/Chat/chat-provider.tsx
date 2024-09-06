import React from "react";
import { ChatContext } from "./chat-context";

export default function ChatProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    const value = {};

    return (
        <ChatContext.Provider value>

        </ChatContext.Provider>
    )
}