import { usernameSchema, UsernameSchema } from "@/types/Profile/Username"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface ProfileProps {
    setUsername: (username: string) => void,
}

export default function Profile({ setUsername }: ProfileProps) {
    const { register, handleSubmit } = useForm<UsernameSchema>({
        resolver: zodResolver(usernameSchema),
    });

    return (
        <div>
            <form onSubmit={handleSubmit(({ username }) => setUsername(username))}>
                <input
                    {...register('username')}
                    placeholder="Insira seu nome de usuario"
                    type="text"
                />
            </form>
        </div>
    )
}