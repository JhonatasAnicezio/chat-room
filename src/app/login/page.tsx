import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";

import './index.css';

export default function Login() {
    return (
        <main className="container-login">
            <h1>Entrar no Chat</h1>

            <div>

                {/* <div className="div-providers">
                    <button className="bg-[#24292E]">
                        <FaGithub className="w-5 h-5" />
                        <span>
                            Continue com o GitHub
                        </span>
                    </button>

                    <button className="bg-[#eeeeee] text-black">
                        <FcGoogle className="w-5 h-5" />
                        <span>
                            Continue com o Google
                        </span>
                    </button>

                    <button className="bg-[#0052CC]">
                        <FaFacebookF className="w-5 h-5" />
                        <span>
                            Continue com o facebook
                        </span>
                    </button>

                </div> */}

                <div className="div-continue-email">

                    <Link href={'/login/email'} className="continue-email">
                        Continue com email
                    </Link>


                    <Link href={'/register'} className="to-register">
                        Não possui conta? cadastre-se
                    </Link>

                </div>


            </div>


        </main>
    )
}