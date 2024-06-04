import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        // If token exists, redirect to the home page
        return <Navigate to="/" />;
    }

    // If no token, render the login component
    return children;
};

export default ProtectedRoute;
