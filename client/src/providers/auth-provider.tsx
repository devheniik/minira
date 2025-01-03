import {ReactNode, useCallback, useEffect, useState} from "react";
import {AuthContext} from "@/context/AuthContext.tsx";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const TOKEN_KEY = "accessToken";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const loadToken = () => {
            const token = localStorage.getItem(TOKEN_KEY);

            if (token) {
                setAuthState({
                    token,
                    authenticated: !isTokenExpired(token),
                });

                if (!isTokenExpired(token)) {
                    axios.defaults.headers.common["Authorization"] =
                        `Bearer ${token}`;
                }
            }
        };

        loadToken();
        setLoading(false);
    }, []);

    const isTokenExpired = (token: string) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode<{ exp: number }>(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true;
        }
    };

    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axios.post(`auth/login`, {
                email,
                password,
            });

            const token = response.data.accessToken;

            setAuthState({
                token,
                authenticated: true,
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            localStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error("🐞 Auth error", error);
            throw new Error("Login failed");
        }
        setLoading(false);
    }, []);

    const register = useCallback(
        async (
            email: string,
            password: string,
            fullName: string,
            companyName: string,
        ) => {
            setLoading(true);
            try {
                //TODO: change to auth/register
                const response = await axios.post(`users/register`, {
                    email,
                    password,
                    fullName,
                    companyName,
                });

                const token = response.data.accessToken;

                setAuthState({
                    token,
                    authenticated: true,
                });

                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${token}`;

                localStorage.setItem(TOKEN_KEY, token);
            } catch (error) {
                console.error("🐞 Auth error", error);
                throw new Error("Registration failed");
            }
            setLoading(false);
        },
        [],
    );

    const logout = useCallback(async () => {
        localStorage.clear();

        axios.defaults.headers.common["Authorization"] = "";

        setAuthState({
            token: null,
            authenticated: false,
        });

    }, []);

    return (
        <AuthContext.Provider
            value={{
                onLogin: login,
                onLogout: logout,
                onRegister: register,
                loading: loading,
                authState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
