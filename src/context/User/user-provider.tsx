'use client'
import React, { useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { Profile, Token } from "@/types/User";
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { singIn, getUser, updateDisplayName } from "@/service/authentication";
import { useRouter } from "next/navigation";

export default function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<Profile | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    const getTokenAndSingIn = async ({ email, password }: AuthEmailSchema) => {
        const data = await singIn({ email, password });

        if (!data) {
            throw new Error('Usuario não encontrado');
        }

        await setUserWithToken(data);

        localStorage.setItem('token-auth', data);
    }

    const setUserWithToken = async (tokenLocal: Token) => {
        try {
            const data = await getUser(tokenLocal);
            console.log(data);

            if (!data) {
                throw new Error('Usuario não encontrado');
            }

            setUser(data);

            router.refresh();
        } catch (error) {
            localStorage.removeItem('token-auth');
        }

    }

    const updateName = async (name: string) => {
        setLoading(true);
        await updateDisplayName(name);

        if (user)
            setUser({ ...user, name });

        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }

    useEffect(() => {
        const token = localStorage.getItem('token-auth');

        const getUser = async () => {

            if (token) {
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
        getTokenAndSingIn,
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