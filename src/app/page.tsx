'use client'
import ContainerMessage from "@/components/Chat/ContainerMessage";
import Sender from "@/components/Chat/Sender";
import { socket } from "@/service/socket";
import { Message } from "@/types/Message";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  socket.on("connection", () => console.log('Conversar com Chat'));

  socket.on('message', (data: Message[]) => {
    console.log('messagem enviada');

    setMessages(data);
  })

  socket.on("messages", (data: Message[]) => {
    setMessages(data);
  })

  return (
    <main className="flex justify-center h-screen w-full">
      <div className="flex flex-col h-full">
        <ol className="flex flex-col-reverse gap-5 p-5 w-[1302px] h-[100%] overflow-y-auto custom-scrollbar">
          {messages.map(({ text, author, createAt, id }, index) =>
            <li key={index}><ContainerMessage text={text} id={id} createAt={createAt} author={author} /></li>
          )}
        </ol>

        <Sender />
      </div>
    </main>
  );
}
