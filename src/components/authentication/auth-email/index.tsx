'use client'
import { useForm } from "react-hook-form"
import { authEmailSchema, AuthEmailSchema } from "./auth-email-schema"
import { zodResolver } from "@hookform/resolvers/zod"

import './index.css'

interface AuthEmailProps {
    authType: 'register' | 'singIn';
    action: (payload: AuthEmailSchema) => any | void;
}

export default function AuthEmail({ action, authType }: AuthEmailProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<AuthEmailSchema>({
        resolver: zodResolver(authEmailSchema),
    });

    const submitEmailAction = async ({ email, password }: AuthEmailSchema) => {
        try {
            const result = await action({ email, password });

            return result;
        } catch (error) {
            if (error instanceof Error) {
                setError('password', { type: 'manual', message: error.message });
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

                {errors.password && <span> {errors.password.message} </span>}
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
                className="submit"
            >
                {authType}
            </button>
        </form>
    )
}