import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
const ProtectedRoute = ({Component}) => {
    const { isAthenticated, user, loading } = useSelector(state => state.user);

    return (
            !loading && !isAthenticated ? <Navigate to='/login' /> :
            <Component />
            
        // <>

        //     {!loading && (
        //         <Route
        //             {...rest}
        //             render={(props) => {
        //                 if (!isAthenticated) {
        //                     return <Navigate to='/login' />;
        //                 }
        //                 return <Component {...props} />;
        //             }}
        //         />
        //     )}
        // </>
    )
}

export default ProtectedRoute