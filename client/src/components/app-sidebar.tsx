import { type SidebarGroup as SidebarGroupType } from "@/config/sidebar";
import {
    Sidebar as SidebarContainer,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuButtonContent,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { type ReactNode } from "react";
import { t } from "i18next";
import { useAuth } from "@/hooks/useAuth.ts";

interface SidebarProps {
    groups: SidebarGroupType[];
    children?: ReactNode;
}

export function Sidebar({ groups, children }: SidebarProps) {
    const { onLogout } = useAuth();
    return (
        <SidebarContainer>
            <SidebarHeader>
                <h1 className="text-xl font-bold">Your App</h1>
            </SidebarHeader>
            <SidebarContent>
                {groups.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{t(group.title)}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton>
                                            <SidebarMenuButtonContent
                                                {...item}
                                            />
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            {children}
            <SidebarFooter>
                <SidebarContent>
                    {/* We can add the avatar, user name, and user email here, but we need to update (or rewrite) the backend response. */}
                    <SidebarMenuButton onClick={onLogout}>
                        <span>{t("Logout")}</span>
                    </SidebarMenuButton>
                </SidebarContent>
            </SidebarFooter>
        </SidebarContainer>
    );
}
