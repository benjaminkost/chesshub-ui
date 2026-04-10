import {UserModel} from "@/types/models/user.model";
import React from "react";

interface AuthContextData {
    user: UserModel | null;
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string, user: UserModel) => void,
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextData>({
        user: null,
        token: null,
        isLoggedIn: false,
        login: () => {},
        logout: () => {}
    })

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<UserModel | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = React.useState<string | null>(() => {
        return localStorage.getItem("token")
    });

    const login = (token: string, userData:UserModel) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{user,token,isLoggedIn: !!token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);