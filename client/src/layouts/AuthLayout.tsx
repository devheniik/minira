import { Outlet } from "react-router";
import { Sidebar } from "@/components/app-sidebar";
import { sidebarConfig } from "@/config/sidebar.ts";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth.ts";

export const AuthLayout = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <>
                <div>Loading...</div>
            </>
        );
    }

    return (
        <>
            <SidebarProvider>
                <Sidebar groups={sidebarConfig} />
                <div className="py-[36px] px-[24px] w-full max-w-[960px]">
                    <Outlet />
                </div>
            </SidebarProvider>
        </>
    );
};
