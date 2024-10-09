'use client'
import Chat from "@/components/Chat";
import Sender from "@/components/Chat/Sender";
import { findById } from "@/service/rooms";
import Settings from "@/components/Chat/Settings";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Room } from "@/types/Room";
import { useRouter } from "next/navigation";

interface PageChatProps {
    params: {
        [`:id`]: string;
    };
}

export default function PageChat({ params }: PageChatProps) {
    const [data, setData] = useState<Room | null>(null);
    const token = Cookies.get('token');
    const router = useRouter();

    if (!token) {
        router.push('/auth/login');
        return null;
    }

    const fetchRoom = async () => {
        const room = await findById(params[':id'], token);

        if (!room) {
            router.push('/');
        }

        setData(room);
    };

    useEffect(() => {
        fetchRoom();
    }, [])

    if (!data) {
        return <div className="absolute w-full h-screen top-0 left-0 bg-[#1E1F22]" />
    }

    const { name, idAuthor } = data;

    return (
        <div className="w-[80%] h-[91%] relative text-white">

            <header className="flex justify-center items-center h-[5%] font-bold text-2xl bg-[#1E1F22]">
                <h1>Sala: {name}</h1>

                <Settings idAuthor={idAuthor} idRoom={params[':id']} />

            </header>

            <Chat roomId={params[':id']} />
            <Sender id={params[':id']} />

        </div>
    )
}