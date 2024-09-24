import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { Profile } from "@/types/User";
import { createContext } from "react";

interface UserContext {
    user: Profile | null,
    setUser: (user: Profile | null) => void,
    setUserWithSingIn: (payload: AuthEmailSchema) => void,
    setUserWithToken: (token: string) => void,
}

export const UserContext = createContext({} as UserContext);