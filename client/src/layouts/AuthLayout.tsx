import {Outlet, useNavigate} from 'react-router-dom'
import {useAuth} from '@/context/AuthContext.tsx'
import {useEffect} from 'react'

export const AuthLayout = () => {
    const {
        authState
    } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!authState?.authenticated) {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState])

    return (
        <>
            <h1>
                Auth Layout
            </h1>
            <Outlet />
        </>
    )
}