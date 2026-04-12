import React from "react";
import { User } from "@benaurel/chesshub-core-client";
import { authApi } from "@/api/chesshub";

interface AuthContextData {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextData>({
    user: null,
    token: null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            return null;
        }
    });

    const [token, setToken] = React.useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    const login = (token: string, userData: User) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (e) {
            console.error("Logout API call failed", e);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    };

    return (
        <AuthContext.Provider value={{user, token, isLoggedIn: !!token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);