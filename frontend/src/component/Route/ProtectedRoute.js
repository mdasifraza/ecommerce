import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ isAdmin, children }) => {
    const { isAthenticated, loading, user } = useSelector(state => state.user);
    if (loading === false) {
        if (isAthenticated === false) {
            return <Navigate to="/login" replace />;
        }

        if (isAdmin === true && user.role !== 'admin') {
            return <Navigate to="/login" replace />;
        }
    }

    return children;
};

export default ProtectedRoute