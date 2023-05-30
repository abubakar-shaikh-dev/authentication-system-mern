import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function Protected() {
    const token = localStorage.getItem("token")

    return !token ? <Navigate to={"/login"} /> : <Outlet />
}
