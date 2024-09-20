import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

import './index.css';

export default function Header() {
    return (
        <header className="container-header">
            <h1>TheChat</h1>

            <div className="container-input">
                <input
                    placeholder="Buscar"
                />

                <button>
                    <FaMagnifyingGlass />
                </button>
            </div>

            <div className="container-auth">
                <Link href={'/login'} className="bg-[#2F2F35]">
                    Entrar
                </Link>

                <Link href={'/register'} className="text-[#2F2F35] bg-[#eeeeee]">
                    Cadastre-se
                </Link>
            </div>
        </header>
    )
}