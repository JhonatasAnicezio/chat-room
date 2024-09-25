'use client'
import React, { useCallback, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { Profile, Token } from "@/types/User";
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { singIn, singInWithToken } from "@/service/authentication";
import { useRouter } from "next/navigation";

export default function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<Profile | null>(null);
    const [ isLoading, setLoading ] = useState<boolean>(true);

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

        localStorage.setItem('token-auth', token)

        setUser(user[0]);
        router.push('/');
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token-auth');

        const getUser = async () => {

            if(token) {
                await setUserWithToken(token);
            }
    
            setLoading(false)
        }
        
        getUser();

    }, []);

    const value = {
        user,
        setUser,
        setUserWithSingIn,
        setUserWithToken,
        isLoading,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}