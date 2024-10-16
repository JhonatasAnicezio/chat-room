import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { Profile } from "@/types/User";
import { createContext } from "react";

interface UserContext {
    user: Profile | null,
    setUser: (user: Profile | null) => void,
    getTokenAndSingIn: (payload: AuthEmailSchema) => void,
    setUserWithToken: (token: string) => void,
    isLoading: boolean,
    setLoading: (isLoading: boolean) => void,
    updateProfileAndUploadImage: (name: string, photoURL: string) => void,
}

export const UserContext = createContext({} as UserContext);