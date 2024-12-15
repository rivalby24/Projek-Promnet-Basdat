import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element, allowedRoles }) => {
    const { user } = useAuth();

    // Jika user tidak ada, arahkan ke login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Jika role user tidak cocok, arahkan ke halaman Unauthorized
    if (allowedRoles && !allowedRoles.includes(user.program_studi)) {
        return <Navigate to="/" />;
    }

    // Render elemen jika semua validasi lolos
    return element;
};

export default PrivateRoute;
