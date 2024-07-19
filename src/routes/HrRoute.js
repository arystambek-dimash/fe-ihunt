import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const HrRoute = () => {
    const {getIsAuthenticated, getIsHr} = useAuth();
    return (getIsAuthenticated() && getIsHr()) ? <Outlet/> : <Navigate to="/hr/login"/>;
};

export default HrRoute;
