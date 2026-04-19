import React, {useEffect} from "react";
import { User } from "@benaurel/chesshub-core-client";
import { authApi, usersApi } from "@/api/clients/apiChesshubCore";

interface AuthContextData {
    user: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextData>({
    user: null,
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

    // Verify session on mount (cookie check)
    useEffect(() => {
        const syncAuth = async () => {
            try {
                const response = await usersApi.getCurrentUser();
                if (response.data) {
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
            } catch (e) {
                // If 401, we are not logged in/session expired
                setUser(null);
                localStorage.removeItem("user");
            }
        };
        syncAuth();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (e) {
            console.error("Logout API call failed", e);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
        }
    };

    return (
        <AuthContext.Provider value={{user, isLoggedIn: !!user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);