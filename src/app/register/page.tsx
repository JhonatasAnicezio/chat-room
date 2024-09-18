'use client'
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import AuthEmail from "@/components/authentication/auth-email";
import { register } from "@/service/authentication";
import { useState } from "react";
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import VerifyEmail from "@/components/app/register/verify-email";

import './index.css';

export default function Register() {
    const [verifyEmail, setVerifyEmail] = useState<boolean>(false);

    const singUp = async ({ email, password }: AuthEmailSchema) => {
        const ok = await register({ email, password });

        if(ok) {
            setVerifyEmail(ok);
        }
    }

    if (verifyEmail) {
        return (<VerifyEmail />)
    }

    return (
        <main className="container-register">

            <div className="div-register">

                <h1>Cadastre-se no Chat</h1>

                <AuthEmail authType="register" action={singUp} />

                <div className="div-middleware">
                    <div />
                    <p>ou</p>
                </div>

                <div>
                    <div className="div-providers-register">
                        <button className="bg-[#24292E]">
                            <FaGithub/>
                            <span>
                                Continue com o GitHub
                            </span>
                        </button>

                        <button className="bg-[#eeeeee] text-black">
                            <FcGoogle/>
                            <span>
                                Continue com o Google
                            </span>
                        </button>

                        <button className="bg-[#0052CC]">
                            <FaFacebookF/>
                            <span>
                                Continue com o facebook
                            </span>
                        </button>

                    </div>
                </div>
            </div>

            <Link href={'/login'} className="to-login">
                Já possui conta? faça login
            </Link>

        </main >
    )
}