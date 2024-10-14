'use client'
import React, { useCallback, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { Profile, Token } from "@/types/User";
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { singIn, getUser, updateProfile } from "@/service/authentication";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

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

        Cookies.set('token', data);
    }

    const setUserWithToken = useCallback(async (tokenLocal: Token) => {
        try {
            const data = await getUser(tokenLocal);

            if (!data) {
                throw new Error('Usuario não encontrado');
            }

            setUser(data);

            router.refresh();
        } catch (error) {
            Cookies.remove('token');
        }

    }, [router]);

    const updateProfileAndUploadImage = async (name: string, photoURL: string) => {
        setLoading(true);

        const token = Cookies.get('token');

        if(!token) throw new Error();
        await updateProfile(name, photoURL, token);

        if (user)
            setUser({ ...user, name, photoURL });

        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }

    useEffect(() => {
        const token = Cookies.get('token');

        const getUser = async () => {

            if (token) {
                await setUserWithToken(token);
            }

            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }

        getUser();

    }, [setUserWithToken]);

    const value = {
        user,
        setUser,
        getTokenAndSingIn,
        setUserWithToken,
        isLoading,
        updateProfileAndUploadImage,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}