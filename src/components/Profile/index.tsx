import { usernameSchema, UsernameSchema } from "@/types/Profile/Username"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import './index.css';
import { IoPersonCircle } from "react-icons/io5";

interface ProfileProps {
    setUsername: (username: string) => void,
}

export default function Profile({ setUsername }: ProfileProps) {
    const { register, handleSubmit } = useForm<UsernameSchema>({
        resolver: zodResolver(usernameSchema),
    });

    return (
        <div>
            <form
                className="form-username"
                onSubmit={handleSubmit(({ username }) => setUsername(username))}
            >
                <div className="div-icon">
                    <IoPersonCircle className="svg" />
                </div>

                <input
                    className="input-username"
                    {...register('username')}
                    placeholder="Insira seu nome de usuario"
                    type="text"
                />
            </form>
        </div>
    )
}