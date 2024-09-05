'use client'
import Chat from "@/components/Chat";
import Sender from "@/components/Chat/Sender";
import { socket } from "@/service/socket";

export default function Home() {
  socket.on("connection", () => console.log('Conversar com Chat'));

  return (
    <main className="flex justify-center h-screen w-full">
      <div className="flex flex-col h-full">
        <Chat />
        <Sender />
      </div>
    </main>
  );
}
