'use client'
import ContainerMessage from "./ContainerMessage";
import { useContext, useEffect } from "react";
import { ChatContext } from "@/context/Chat/chat-context";
import { socket } from "@/service/socket";

interface ChatProps {
    roomId: string;
}

export default function Chat({ roomId }: ChatProps) {
    const { messages } = useContext(ChatContext);

    useEffect(() => {
        socket.emit('start-chat', roomId);
    }, [])

    return (
        <ol className="flex flex-col-reverse gap-5 p-5 w-full h-[97%] overflow-y-auto custom-scrollbar">
            {messages.map(({ text, author, createAt, id, photoAuthorURL }, index) =>
                <li key={index}>
                    <ContainerMessage
                        photoAuthorURL={photoAuthorURL}
                        text={text}
                        id={id}
                        createAt={createAt}
                        author={author}
                    />
                </li>
            )}
        </ol>
    )
}