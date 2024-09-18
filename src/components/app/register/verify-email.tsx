import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import './index.css';

export default function VerifyEmail() {
    return (
        <main className="container-verify-email">
            <div className="div-icon">
                <FaEnvelope className="title" />
            </div>

            <h1 className="title">Verifique sua caixa de email</h1>

            <p className="text-sm">Acabamos de enviar um email de confirmação para seu email</p>

            <p className="attention">
                Clique no link de verificação para confirmar seu endereço e continuar com o processo.
                Certifique-se de checar a pasta de spam ou lixo eletrônico caso não encontre o email.
            </p>

            <Link href={'/'}>
               {`<- voltar ao site`}
            </Link>
        </main>
    )
}