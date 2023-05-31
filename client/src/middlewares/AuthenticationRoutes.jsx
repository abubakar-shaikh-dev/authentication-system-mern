import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthenticationRoutes() {
    const token = localStorage.getItem("token")

    return token ? <Navigate to={"/user"} /> : <Outlet />
}
