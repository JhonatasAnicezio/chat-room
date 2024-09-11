'use client'
import Chat from "@/components/Chat";
import Sender from "@/components/Chat/Sender";
import Profile from "@/components/Profile";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>();

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
