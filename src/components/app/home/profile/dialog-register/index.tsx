'use client'
import { useForm } from "react-hook-form"
import { registerProfileSchema, RegisterProfileSchema } from "./register-profile-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { UserContext } from "@/context/User/user-context";
import './index.css';

export default function DialogRegister() {
    const { updateName } = useContext(UserContext);

    const {
        register,
        handleSubmit,
    } = useForm<RegisterProfileSchema>({
        resolver: zodResolver(registerProfileSchema),
    });

    return (
        <div className='container-register-profile'>
            <form onSubmit={handleSubmit(({ displayName }) => updateName(displayName))}>
                <label>
                    Crie seu usuario
                </label>
                <input
                    {...register('displayName')}
                    maxLength={20}
                    placeholder='Nome exibido'
                />

                <button type="submit">
                    Salvar
                </button>
            </form>
        </div>
    )
}