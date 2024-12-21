import {Outlet, useNavigate} from 'react-router-dom'
import {useAuth} from '@/context/AuthContext.tsx'
import {useEffect} from 'react'
import {Sidebar} from '@/components/app-sidebar'
import {sidebarConfig} from '@/config/sidebar.ts'
import {SidebarProvider} from '@/components/ui/sidebar'

export const AuthLayout = () => {
    const {authState} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(authState, 'authState')
        if (!authState?.authenticated) {
            navigate('/login')
        }
    }, [authState, navigate]) // Added navigate to dependency array to fix exhaustive-deps warning

    return (
        <>
            <SidebarProvider>
                <Sidebar groups={sidebarConfig} />
                <Outlet />
            </SidebarProvider>
        </>
    )
}
