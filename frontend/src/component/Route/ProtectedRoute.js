import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const { isAthenticated, loading } = useSelector(state => state.user);
    if (!isAthenticated && !loading) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute