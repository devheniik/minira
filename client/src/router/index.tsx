import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import {LoginView} from "@/views/LoginView.tsx";
import {AuthLayout} from "@/layouts/AuthLayout.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginView />,
    }
]);