import ContainerMessage from "./ContainerMessage";
import { useContext, useEffect } from "react";
import { ChatContext } from "@/context/Chat/chat-context";
import { socket } from "@/service/socket";

export default function Chat() {
    const { messages } = useContext(ChatContext);

    useEffect(() => {
        socket.emit('start-chat');
    }, [])

    return (
        <ol className="flex flex-col-reverse gap-5 p-5 w-[1302px] h-[100%] overflow-y-auto custom-scrollbar">
            {messages.map(({ text, author, createAt, id }, index) =>
                <li key={index}><ContainerMessage text={text} id={id} createAt={createAt} author={author} /></li>
            )}
        </ol>
    )
}