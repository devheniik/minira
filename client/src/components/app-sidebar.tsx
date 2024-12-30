import { type SidebarGroup as SidebarGroupType } from "@/config/sidebar";
import {
    Sidebar as SidebarContainer,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuButtonContent,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { type ReactNode } from "react";
import SidebarLogOut from "@/components/sidebar-log-out";
import SidebarHeaderContent from "./sidebar-header-content";

interface SidebarProps {
    groups: SidebarGroupType[];
    children?: ReactNode;
}

export function Sidebar({ groups, children }: SidebarProps) {
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <SidebarHeaderContent />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {groups.map((group, idx) => (
                    <SidebarGroup key={idx}>
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
                                <SidebarLogOut />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            {children}
            <SidebarFooter></SidebarFooter>
        </SidebarContainer>
    );
}
