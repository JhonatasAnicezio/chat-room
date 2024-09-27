'use client'
import AuthEmail from "@/components/authentication/auth-email";
import Link from "next/link";

import './index.css';
import { useContext } from "react";
import { UserContext } from "@/context/User/user-context";

export default function Email() {
    const { getTokenAndSingIn } = useContext(UserContext);

    return (
        <div className="container-login-email">
            <h1>
                Entrar no Chat
            </h1>

            <AuthEmail authType="singIn" action={getTokenAndSingIn} />

            <Link href={'/auth/register'}>
                Não possui conta? cadastre-se
            </Link>
        </div>
    )
}