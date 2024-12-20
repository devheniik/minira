import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import { LoginView } from "@/views/LoginView.tsx";
import { AuthLayout } from "@/layouts/AuthLayout.tsx";
import RegisterView from "@/views/RegisterView.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginView />,
    },
    {
        path: "/register",
        element: <RegisterView />,
    },
]);
