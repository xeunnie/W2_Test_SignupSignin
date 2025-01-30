import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsAuthenticated(!!token);
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};