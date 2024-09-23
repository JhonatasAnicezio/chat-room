'use client'
import React, { useState } from "react";
import { UserContext } from "./user-context";
import { User } from "@/types/User";
import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { singIn } from "@/service/authentication";
import { useRouter } from "next/navigation";

export default function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    const setUserWithSingIn = async ({ email, password }: AuthEmailSchema) => {
        const data = await singIn({ email, password });

        if(!data) {
            throw new Error('Usuario não encontrado');
        }
        
        setUser(data);
        router.push('/');
    }

    const value = {
        user,
        setUser,
        setUserWithSingIn,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}