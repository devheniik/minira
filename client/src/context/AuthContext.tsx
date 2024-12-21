import {createContext} from "react";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    loading?: boolean;
    onLogin?: (email: string, password: string) => Promise<void>;
    onRegister?: (
        email: string,
        password: string,
        fullName: string,
        companyName: string,
    ) => Promise<void>;
    onLogout?: () => Promise<void>;
}

export const AuthContext = createContext<AuthProps>({});
