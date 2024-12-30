import { useAuth } from "@/hooks/useAuth.ts";
import { Navigate } from "react-router";
import { type ReactNode } from "react";

const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { authState } = useAuth();

    return authState?.authenticated === true ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );
};

export default RequireAuth;
