export interface SidebarItem {
    title: string;
    route: string;
    icon: string;
}

export interface SidebarGroup {
    items: SidebarItem[];
}

export const sidebarConfig: SidebarGroup[] = [
    {
        items: [
            {
                title: "Dashboard",
                route: "dashboard",
                icon: "dashboard",
            },
            {
                title: "Sprints",
                route: "sprints",
                icon: "sprints",
            },
            {
                title: "Members",
                route: "members",
                icon: "members",
            },
            {
                title: "Job Titles",
                route: "job-titles",
                icon: "job-titles",
            },
            {
                title: "Settings",
                route: "settings",
                icon: "settings",
            },
            // {
            //     title: "Log out",
            //     route: "#",
            //     icon: "log-out",
            // },
        ],
    },
];
