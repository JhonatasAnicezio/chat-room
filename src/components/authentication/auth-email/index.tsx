'use client'
import { useForm } from "react-hook-form"
import { authEmailSchema, AuthEmailSchema } from "./auth-email-schema"
import { zodResolver } from "@hookform/resolvers/zod"

import { useContext } from "react"
import { UserContext } from "@/context/User/user-context"
import './index.css'

interface AuthEmailProps {
    authType: 'register' | 'singIn';
    action: (payload: AuthEmailSchema) => any | void;
}

export default function AuthEmail({ action, authType }: AuthEmailProps) {
    const { isLoading, setLoading } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<AuthEmailSchema>({
        resolver: zodResolver(authEmailSchema),
    });

    const submitEmailAction = async ({ email, password }: AuthEmailSchema) => {
        setLoading(true);

        try {
            await action({ email, password });

            setTimeout(() => {
                setLoading(false);
            }, 1000)
        } catch (error) {
            if (error instanceof Error) {
                setError('password', { type: 'manual', message: error.message });
                setLoading(false);
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit(submitEmailAction)}
            className="form-email"
        >

            <div>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="Email address"
                    className="input"
                />

                {errors.email && <span> {errors.email.message} </span>}
            </div>

            <div>

                <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className="input"
                />

                {errors.password && <span> {errors.password.message} </span>}
            </div>

            <button
                type="submit"
                className={`submit ${isLoading && 'opacity-50'}`}
            >
                {authType}
            </button>
        </form>
    )
}