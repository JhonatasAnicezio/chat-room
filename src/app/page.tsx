'use client'
import Chat from "@/components/Chat";
import Sender from "@/components/Chat/Sender";
import Profile from "@/components/Profile";
import { socket } from "@/service/socket";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>();
  socket.on("connection", () => console.log('Conversar com Chat'));

  if(!username) {
    return (<Profile setUsername={setUsername} />)
  }

  return (
    <main className="flex justify-center h-screen w-full">
      <div className="flex flex-col h-full">
        <Chat />
        <Sender username={username} />
      </div>
    </main>
  );
}
