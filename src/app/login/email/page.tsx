import AuthEmail from "@/components/authentication/auth-email";
import Link from "next/link";

import { singIn } from "@/service/authentication";
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import './index.css';

export default function Email() {

    async function sing({ email, password }: AuthEmailSchema) {
        "use server"
        await singIn({ email, password });
    }

    return (
        <div className="container-login-email">
            <h1>
                Entrar no Chat
            </h1>

            <AuthEmail authType="singIn" action={sing} />

            <Link href={'/register'}>
                Não possui conta? cadastre-se
            </Link>
        </div>
    )
}