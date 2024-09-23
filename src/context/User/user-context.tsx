import { AuthEmailSchema } from "@/components/authentication/auth-email/auth-email-schema";
import { User } from "@/types/User";
import { createContext } from "react";

interface UserContext {
    user: User | null,
    setUser: (user: User) => void,
    setUserWithSingIn: (payload: AuthEmailSchema) => void,
}

export const UserContext = createContext({} as UserContext);