'use client'
import { UserContext } from "@/context/User/user-context";
import Link from "next/link";
import { useContext } from "react";

export default function Ancor() {
    const { user, setUser } = useContext(UserContext);

    if(user) {
        return (
            <button
                onClick={() => {
                    setUser(null);
                    localStorage.removeItem('token-auth');
                }}
                className="bg-red-500 px-5 py-0.5 rounded-sm"
            >
                Sair
            </button>
        )
    }

    return (
        <>
            <Link href={'/auth/login'} className="bg-[#2F2F35]">
                Entrar
            </Link>

            <Link href={'/auth/register'} className="text-[#2F2F35] bg-[#eeeeee]">
                Cadastre-se
            </Link>
        </>
    )
}