'use client'
import { UserContext } from "@/context/User/user-context";
import Link from "next/link";
import { useContext } from "react";
import Cookies from 'js-cookie';

export default function Ancor() {
    const { user, setUser } = useContext(UserContext);

    if(user) {
        return (
            <button
                onClick={() => {
                    Cookies.remove('token');
                    window.location.reload();
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