"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Vérifie si les données utilisateur, userId et token existent dans le localStorage
        const storedUser = localStorage.getItem("user");
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedUserId) {
            setUserId(JSON.parse(storedUserId));
        }

        if (storedToken) {  // Correction : on vérifie bien storedToken ici
            setToken(JSON.parse(storedToken));
        }
    }, []);

    const login = (userData, token, userId) => {
        // Sauvegarde les données utilisateur dans le localStorage et dans le state
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
        setUser(userData);
        setToken(token);
        setUserId(userId);
    };

    const logout = () => {
        // Supprime les données utilisateur du localStorage et du state
        // localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        // setUser(null);
        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ user, userId, token, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};
