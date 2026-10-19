import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import client from "../api/axiosInstance.jsx";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const router = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSignup = async (username, email, password) => {
        try {
            const data = { username, email, password };
            console.log("Submitting Sign Up Form to server -->", data);

            const response = await client.post("/auth/signup", data, { skipInterceptor: true });
            const accessToken = response.data.accessToken;

            localStorage.setItem("accessToken", accessToken);
            setIsAuthenticated(true);
        } catch (err) {
            console.log(err);
            console.log(`Error Status : ${err.response.status}`);
            console.log(`Error Message : ${err.response.data.message}`);
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const data = { username, password };
            console.log("Submitting Login Form to server --> ", data);

            const response = await client.post("/auth/signin", data, { skipInterceptor: true });
            const accessToken = response.data.accessToken;

            localStorage.setItem("accessToken", accessToken);
            setIsAuthenticated(true);
        } catch (err) {
            console.log(err);
            console.log(`Error Status : ${err.response.status}`);
            console.log(`Error Message : ${err.response.data.message}`);
            throw err;
        }
    };

    const handleLogout = async () => {
        try {
            const response = await client.post("/auth/logout");
            console.log(`Response : ${response.data.message}`);

            localStorage.removeItem("accessToken");
            setIsAuthenticated(false);

            router("/signin");
        } catch (err) {
            console.log(err);
            console.log(`Error Status : ${err.response.status}`);
            console.log(`Error Message : ${err.response.data.message}`);
        }
    };

    useEffect(() => {
        const verify = () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        verify();
    }, []);

    const data = { isAuthenticated, setIsAuthenticated, handleSignup, handleLogin, handleLogout };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

