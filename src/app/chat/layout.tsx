'use client'
import Profile from "@/components/app/home/profile";
import ChatProvider from "@/context/Chat/chat-provider";
import { UserContext } from "@/context/User/user-context";
import { socket } from "@/service/socket";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, isLoading } = useContext(UserContext);

    socket.on("connection", () => console.log('tenta conectar'));

    const router = useRouter();

    if (!isLoading && !user) {
        router.push('/auth/login');
    }

    if (!user) {
        return null
    }

    return (
        <ChatProvider>
            <div className="flex w-full h-screen bg-[#212121]">
                <Profile />
                {children}
            </div>
        </ChatProvider>
    );
}
