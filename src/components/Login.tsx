import React, {useState} from "react";
import {Box, Paper, TextField, Typography, Button, Link, Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {authApi} from "@/api/chesshub";
import {useAuth} from "@/context/AuthContext";
import { LoginRequest } from "@benaurel/chesshub-core-client";
import {ROUTES} from "@/routes";


export function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const emailOrUsernameInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEmailOrUsername(event.target.value);
    };

    const passwordInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        setError(null);
        try {
            const loginRequest: LoginRequest = {
                usernameOrEmail: emailOrUsername,
                password: password
            };
            const response = await authApi.login(loginRequest);
            
            if (response.data) {
                authLogin(response.data as any);
                navigate(ROUTES.GAMES.CREATE.func());
            } else {
                setError("Ungültige Antwort vom Server.");
            }
        } catch (err: any) {
            console.error("Login failed:", err);
            const backendMessage = err.response?.data?.message || err.response?.data?.error;
            setError(backendMessage ? `Fehler: ${backendMessage}` : "Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.");
        }
    }

    const disabled = !emailOrUsername || !password;

    return (
        <>
            <Box sx={{
                flexGrow: 1,
                minHeight: "14vh"
            }}/>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Paper
                    sx={{
                        display: "flex",
                        mt: 4,
                        flexGrow: 1,
                        flexDirection: "column",
                        gap: 2,
                        maxWidth: "sm",
                        maxHeight: "sm",
                        mb: 3,
                        backgroundColor: "lightgray",
                        padding: 5
                    }}
                >
                    <Typography variant={"h5"}
                                sx={{
                                    mb: 3,
                                    color: "#424242"
                                }}
                    >
                        Login
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        label={"Email oder Benutzername"}
                        type={"text"}
                        required
                        value={emailOrUsername}
                        onChange={emailOrUsernameInput}
                        sx={{
                            backgroundColor: "white"
                        }}
                    />
                    <TextField
                        label={"Passwort"}
                        type={"password"}
                        required
                        value={password}
                        onChange={passwordInput}
                        sx={{
                            backgroundColor: "white"
                        }}
                    />
                    <Button
                        onClick={handleLogin}
                        disabled={disabled}
                        sx={{
                            backgroundColor: disabled ? "#cfcfcf" : "gray",
                            color: "white",
                            "&:hover": {
                                backgroundColor: disabled ? "#cfcfcf" : "#616161"
                            }
                        }}
                    >
                        Login
                    </Button>
                    <Link
                        href={"/auth/register"}
                        sx={{
                            color: "gray",
                            textAlign: "center"
                        }}
                    >
                        Registrier dich
                    </Link>
                    <Link
                        href={"/request-new-password"}
                        sx={{
                            color: "gray",
                            textAlign: "center"
                        }}
                    >
                        Passwort zurücksetzen
                    </Link>
                </Paper>
            </Box>
        </>
    );
}