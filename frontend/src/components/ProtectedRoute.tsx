import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router';


interface ProtectedRouteProps {
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;