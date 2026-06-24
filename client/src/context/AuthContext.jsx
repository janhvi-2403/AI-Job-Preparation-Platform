import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (data) => {
        setUser(data.user);
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    // AUTO LOGIN
    const fetchUser = async () => {
        try {
            const res = await api.get("/user/me");
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);