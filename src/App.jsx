import './App.css';
import React from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import AutoResponseLandingPage from "./pages/AutoResponseLandingPage";
import AutoResponseLoginPage from "./pages/AutoResponseLoginPage";
import HrSignUpPage from "./pages/HrSignUpPage";
import HrProfilePage from "./pages/HrProfilePage";
import AutoResponseMainPage from "./pages/AutoResponseMainPage";
import AutoResponseDashboardPage from "./pages/AutoResponseDashboardPage";
import LandingNavbar from "./components/LandingNavbar";
import AutoResponseNavbar from "./components/AutoResponseNavbar";
import Footer from "./components/Footer";
import AutoResponseSignUpPage from "./pages/AutoResponseSignUpPage";
import AutoResponseProfilePage from "./pages/AutoResponseProfilePage";
import HrLoginPage from "./pages/HrLoginPage";
import PrivateRoute from './routes/PrivateRoute';
import HrRoute from './routes/HrRoute';
import NotFoundPage from './pages/NotFoundPage';
import HhCallbackPage from "./pages/HhCallbackPage";
import HiringRecruiterLandingPage from "./pages/HrLandingPage";
import LinkedInCallbackPage from "./pages/LinkedinCallbackPage";

const AppContent = () => {
    const location = useLocation();

    const isLandingPage = location.pathname === '/' || location.pathname === '/hiring-managers';
    const showLandingNavbarPaths = ['/auto-response/login', '/auto-response/sign-up', '/hr/sign-up', '/hr/login'];
    const definedRoutes = [
        '/',
        '/hiring-managers',
        '/auto-response/sign-up',
        '/auto-response/login',
        '/hr/sign-up',
        '/hr/login',
        '/hr/profile',
        '/auto-response/profile',
        '/auto-response/home',
        '/auto-response/responses',
        '/auto-response/headhunter/callback',
        '/auto-response/linkedin/callback'
    ];

    const isNotFoundPage = !definedRoutes.includes(location.pathname);

    return (
        <>
            {!isNotFoundPage && (isLandingPage || showLandingNavbarPaths.includes(location.pathname)) ? (
                <LandingNavbar/>
            ) : (
                !isNotFoundPage && <AutoResponseNavbar/>
            )}
            <Routes>
                <Route path="/" element={<AutoResponseLandingPage/>}/>
                <Route path="/hiring-managers" element={<HiringRecruiterLandingPage/>}/>
                <Route path="/auto-response/sign-up" element={<AutoResponseSignUpPage/>}/>
                <Route path="/auto-response/login" element={<AutoResponseLoginPage/>}/>
                <Route path="/hr/sign-up" element={<HrSignUpPage/>}/>
                <Route path="/hr/login" element={<HrLoginPage/>}/>
                <Route path="/hr" element={<HrRoute/>}>
                    <Route path="profile" element={<HrProfilePage/>}/>
                </Route>
                <Route path="/auto-response" element={<PrivateRoute/>}>
                    <Route path="profile" element={<AutoResponseProfilePage/>}/>
                    <Route path="home" element={<AutoResponseMainPage/>}/>
                    <Route path="responses" element={<AutoResponseDashboardPage/>}/>
                    <Route path="headhunter/callback" element={<HhCallbackPage/>}/>
                    <Route path="linkedin/callback" element={<LinkedInCallbackPage/>}/>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            {!isNotFoundPage && isLandingPage && <Footer/>}
        </>
    );
}

export default AppContent;
