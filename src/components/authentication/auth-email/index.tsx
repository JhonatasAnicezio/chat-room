'use client'
import { useForm } from "react-hook-form"
import { authEmailSchema, AuthEmailSchema } from "./auth-email-schema"
import { zodResolver } from "@hookform/resolvers/zod"

import './index.css'

export default function AuthEmail() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthEmailSchema>({
        resolver: zodResolver(authEmailSchema),
    });

    return (
        <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className="form-email"
        >

            <div>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="Email address"
                    className="input"
                />

                {errors.email &&
                    <span className="text-xs text-red-500 pl-1">
                        {errors.email.message}
                    </span>
                }
            </div>

            <div>

                <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className="input"
                />

                {errors.password &&
                    <span className="text-xs text-red-500 pl-1">
                        {errors.password.message}
                    </span>
                }
            </div>

            <button
                type="submit"
                className="submit"
            >
                Entrar
            </button>
        </form>
    )
}