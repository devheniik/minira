import {ReactNode, useCallback, useEffect, useState} from "react";
import {AuthContext} from "@/context/AuthContext.tsx";
import axios from "axios";

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

    const validateToken = async (token: string) => {
        try {
            await axios.get('/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return true;
        } catch (error) {
            console.error("Token validation failed:", error);
            return false;
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem(TOKEN_KEY);

                if (token) {
                    const isValid = await validateToken(token);

                    setAuthState({
                        token,
                        authenticated: isValid,
                    });

                    if (isValid) {
                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    } else {
                        // Clear invalid token
                        localStorage.removeItem(TOKEN_KEY);
                        axios.defaults.headers.common["Authorization"] = "";
                    }
                } else {
                    setAuthState({
                        token: null,
                        authenticated: false,
                    });
                }
            } catch (error) {
                console.error("Error loading token:", error);
                setAuthState({
                    token: null,
                    authenticated: false,
                });
            } finally {
                setLoading(false);
            }
        })();

    }, []);

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
