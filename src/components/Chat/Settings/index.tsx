'use client'
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/User/user-context";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteRoom } from "@/service/rooms";
import Cookies from 'js-cookie';

interface SettingsProps {
    idAuthor: string;
    idRoom: string;
}

export default function Settings({ idAuthor, idRoom }: SettingsProps) {
    const { user } = useContext(UserContext);

    const token = Cookies.get('token');

    if (!token) {
        return null
    }

    const sendDelete = async () => {
        await deleteRoom(idRoom, token);

        window.location.reload();
    }

    return (
        <div className="absolute right-10 flex gap-5">
            <Link href={'/'} className="text-sm bg-red-500 px-5 py-0.5 rounded-sm">
                Sair
            </Link>

            {idAuthor === user?.uid &&
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="text-[#cccccc]">
                            <CiSettings />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="container-dialog">
                        <DialogHeader>
                            <DialogTitle>Configurações</DialogTitle>
                            <DialogDescription>
                                Delete sua sala
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex w-full justify-end">
                            <button
                                onClick={async () => await sendDelete()}
                                className="text-sm font-bold bg-red-500 px-5 py-1 rounded-sm"
                            >
                                Apagar Sala
                            </button>
                        </div>
                    </DialogContent>
                </Dialog >
            }
        </div>
    )
}