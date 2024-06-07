import React, { createContext, useState, useContext } from 'react';
import { setAuthToken } from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState();
    const [userRole, setUserRole] = useState();
    const [username, setUsername] = useState();
    const [requestCount, setRequestCount] = useState();


    const login = (newToken) => {
        setIsLoggedIn(true);
        setToken(newToken);
        setAuthToken(newToken);
        const tokenInfo = jwtDecode(newToken)
        const { id, role, username, requestCount } = tokenInfo;
        setUserId(id);
        setUsername(username);
        setUserRole(role);
        setRequestCount(Number(requestCount));
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setAuthToken(null);
        setUserId(null);
        setUsername(null);
        setUserRole(null);
        setRequestCount(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, userId, userRole, username, requestCount, setRequestCount , login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
