import AuthEmail from "@/components/authentication/auth-email";
import Link from "next/link";

import './index.css';

export default function Email() {
    return (
        <div className="container-login-email">
            <h1>
                Entrar no Chat
            </h1>

            <AuthEmail />

            <Link href={'/register'}>
                Não possui conta? cadastre-se
            </Link>
        </div>
    )
}