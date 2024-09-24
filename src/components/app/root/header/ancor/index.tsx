'use client'
import { UserContext } from "@/context/User/user-context";
import Link from "next/link";
import { useContext } from "react";

export default function Ancor() {
    const { user } = useContext(UserContext);

    if(user) {
        return null;
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