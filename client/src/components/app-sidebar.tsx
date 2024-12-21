import {type SidebarGroup as SidebarGroupType} from '@/config/sidebar'
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
} from '@/components/ui/sidebar'
import {type ReactNode} from 'react'
import {t} from 'i18next'

interface SidebarProps {
    groups: SidebarGroupType[]
  children?: ReactNode
}

export function Sidebar({ groups, children }: SidebarProps) {

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
                                            <SidebarMenuButtonContent {...item} />
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            {children}
        </SidebarContainer>
    )
}
