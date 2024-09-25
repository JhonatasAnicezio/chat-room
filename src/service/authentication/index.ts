"use server"
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { authApi } from "../api";
import { AxiosError, AxiosResponse } from "axios";
import { Token, User } from "@/types/User";


export async function singIn({ email, password }: AuthEmailSchema) {
    try {
        const { data }: AxiosResponse<User> = await authApi.post('/sing-in', { email, password });

        return data;
    } catch (error: AxiosError | unknown) {
        if(error instanceof AxiosError) {
            const message = error.response?.data.message;
            throw new Error(message)
        }
    }
}

export async function register({ email, password }: AuthEmailSchema) {
    try {
        const data = await authApi.post<AxiosResponse>('/', { email, password });

        if(data.status !== 201) {
            throw new Error('Erro ao tentar cadastrar')
        }

        return true
    } catch (error: AxiosError | unknown) {
        if(error instanceof AxiosError) {
            const message = error.response?.data.message;
            throw new Error(message)
        }
    }
}

export async function singInWithToken(token: Token) {
    try {
        const { data }: AxiosResponse<User> = await authApi.post('/sing-in/token', { token });

        return data;
    } catch (error: AxiosError | unknown) {
        if(error instanceof AxiosError) {
            const message = error.response?.data.message;
            throw new Error(message)
        }
    }
}

export async function updateDisplayName(name: string) {
    try {
        await authApi.put('/display-name', { name });
    } catch (error: AxiosError | unknown) {
        if(error instanceof AxiosError) {
            const message = error.response?.data.message;

            throw new Error(message)
        }
    }
}
