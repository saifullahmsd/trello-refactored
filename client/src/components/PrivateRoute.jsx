import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from "../layouts/MainLayout";

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);


    return userInfo ? <MainLayout /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
