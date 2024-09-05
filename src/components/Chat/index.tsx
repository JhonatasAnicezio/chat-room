import { Message } from "postcss";
import ContainerMessage from "./ContainerMessage";
import { useState } from "react";
import { socket } from "@/service/socket";

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);


    socket.on('message', (data: Message[]) => {
        console.log('messagem enviada');

        setMessages(data);
    })

    socket.on("messages", (data: Message[]) => {
        setMessages(data);
    })

    return (
        <ol className="flex flex-col-reverse gap-5 p-5 w-[1302px] h-[100%] overflow-y-auto custom-scrollbar">
            {messages.map(({ text, author, createAt, id }, index) =>
                <li key={index}><ContainerMessage text={text} id={id} createAt={createAt} author={author} /></li>
            )}
        </ol>
    )
}