"use server"
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { authApi } from "../api";
import { AxiosError, AxiosResponse } from "axios";


export async function singIn({ email, password }: AuthEmailSchema) {
    try {
        const { data } = await authApi.post<AxiosResponse>('/sing-in', { email, password });

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