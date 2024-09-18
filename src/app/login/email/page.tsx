import AuthEmail from "@/components/authentication/auth-email";
import Link from "next/link";

import './index.css';

export default function Email() {
    return (
        <main className="container-login-email">
            <h1>
                Entrar no Chat
            </h1>

            <AuthEmail />

            <Link href={'/register'}>
                Não possui conta? cadastre-se
            </Link>
        </main>
    )
}