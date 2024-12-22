export interface SidebarItem {
  title: string
  route: string
  icon: string
}

export interface SidebarGroup {
    title: string
    items: SidebarItem[]
}

export const sidebarConfig: SidebarGroup[] = [
    {
        title: 'Projects',
        items: [
            {
                title: 'Dashboard',
                route: 'dashboard',
                icon: 'home'
            },
            {
                title: 'Users',
                route: 'members',
                icon: 'user'
            },
            {
                title: 'Settings',
                route: 'settings',
                icon: 'home'
            }
        ]
    }
] 