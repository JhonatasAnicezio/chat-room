'use client'

import AuthEmail from "@/components/authentication/auth-email";
import Link from "next/link";

import './index.css';
import { singIn } from "@/service/authentication";

export default function Email() {
    return (
        <div className="container-login-email">
            <h1>
                Entrar no Chat
            </h1>

            <AuthEmail authType="singIn" action={singIn} />

            <Link href={'/register'}>
                Não possui conta? cadastre-se
            </Link>
        </div>
    )
}