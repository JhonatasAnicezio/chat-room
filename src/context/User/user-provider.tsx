'use client'
import React, { useCallback, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { Profile, Token } from "@/types/User";
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { singIn, singInWithToken, updateDisplayName } from "@/service/authentication";
import { useRouter } from "next/navigation";

export default function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<Profile | null>(null);
    const [ isLoading, setLoading ] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);

    const router = useRouter();

    const setUserWithSingIn = async ({ email, password }: AuthEmailSchema) => {
        const data = await singIn({ email, password });

        if (!data) {
            throw new Error('Usuario não encontrado');
        }

        const { user } = data;
        const { token } = data;

        localStorage.setItem('token-auth', token)

        setUser(user[0]);
        router.push('/');
    }

    const setUserWithToken = useCallback(async (tokenLocal: Token) => {
        const data = await singInWithToken(tokenLocal);

        if (!data) {
            throw new Error('Usuario não encontrado');
        }

        const { user } = data;
        const { token } = data;

        setToken(token);
        localStorage.setItem('token-auth', token)

        setUser(user[0]);
        router.push('/');
    }, []);

    const updateName = useCallback(async (name: string) => {
        setLoading(true);
        await updateDisplayName(name);

        if(token)
        await setUserWithToken(token);

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token-auth');

        const getUser = async () => {

            if(token) {
                await setUserWithToken(token);
            }

            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
        
        getUser();

    }, []);

    const value = {
        user,
        setUser,
        setUserWithSingIn,
        setUserWithToken,
        isLoading,
        updateName,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}