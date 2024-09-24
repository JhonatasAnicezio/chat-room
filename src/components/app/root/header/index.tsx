import { FaMagnifyingGlass } from "react-icons/fa6";

import './index.css';
import Ancor from "./ancor";

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
                <Ancor />
            </div>
        </header>
    )
}