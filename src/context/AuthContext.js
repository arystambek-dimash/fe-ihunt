import React, {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isHr, setIsHr] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const storedIsHr = localStorage.getItem('isHr') === 'true';
        if (accessToken) {
            setIsAuthenticated(true);
            setIsHr(storedIsHr);
        }
        console.log('useEffect run - accessToken:', accessToken, 'isAuthenticated:', isAuthenticated, 'isHr:', isHr);
    }, []);

    useEffect(() => {
        console.log('State updated - isAuthenticated:', isAuthenticated, 'isHr:', isHr);
    }, [isAuthenticated, isHr]);

    const login = (accessToken, refreshToken, isHr) => {
        console.log('Login function called');
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('isHr', isHr);
        setIsAuthenticated(true);
        setIsHr(isHr);
        console.log('Login - accessToken:', accessToken, 'isHr:', isHr);
    };

    const logout = () => {
        console.log('Logout function called');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isHr');
        setIsAuthenticated(false);
        setIsHr(false);
        console.log('Logged out - isAuthenticated:', isAuthenticated, 'isHr:', isHr);
    };

    const getIsAuthenticated = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return true;
        }
        return false
    }

    const getIsHr = () => {
        return localStorage.getItem('isHr') === 'true'
    }

    return (
        <AuthContext.Provider value={{getIsAuthenticated, getIsHr, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
