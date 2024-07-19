import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const PrivateRoute = () => {
    const {getIsAuthenticated, getIsHr} = useAuth();
    return (getIsAuthenticated() && !getIsHr()) ? <Outlet/> : <Navigate to="/auto-response/login"/>;
};

export default PrivateRoute;
