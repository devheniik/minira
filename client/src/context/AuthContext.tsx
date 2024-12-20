import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "axios";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onLogin?: (email: string, password: string) => Promise<void>;
    onRegister?: (
        email: string,
        password: string,
        fullName: string,
        companyName: string,
    ) => Promise<void>;
    onLogout?: () => Promise<void>;
}

const TOKEN_KEY = "access_token";
const AuthContext = createContext<AuthProps>({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = () => {
            const token = localStorage.getItem(TOKEN_KEY);

            if (token) {
                setAuthState({
                    token,
                    authenticated: true,
                });

                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${token}`;
            }
        };

        loadToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}auth/login`,
                {
                    email,
                    password,
                },
            );

            const token = response.data.access_token;

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
    };
    const register = async (
        email: string,
        password: string,
        fullName: string,
        companyName: string,
    ) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}auth/register`,
                {
                    email,
                    password,
                    fullName,
                    companyName,
                },
            );

            const token = response.data.access_token;

            setAuthState({
                token,
                authenticated: true,
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            localStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error("🐞 Auth error", error);
            throw new Error("Registration failed");
        }
    };

    const logout = async () => {
        localStorage.getItem(TOKEN_KEY);

        axios.defaults.headers.common["Authorization"] = "";

        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    const value = {
        onLogin: login,
        onLogout: logout,
        onRegister: register,
        authState,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
