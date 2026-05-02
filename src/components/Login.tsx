import React, { useState } from "react";
import { Box, Paper, TextField, Typography, Button, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/clients/apiChesshubCore";
import { useAuth } from "@/context/AuthContext";
import { LoginRequest } from "@benaurel/chesshub-core-client";
import { ROUTES } from "@/routes";
import { tokens } from "@/styles/theme";


export function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const emailOrUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailOrUsername(event.target.value);
    };

    const passwordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            }} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: tokens.color.surfaceContainerLow,
                        padding: 3,
                        borderRadius: tokens.radius.xl,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                        backgroundColor: tokens.color.surfaceContainerHighest,
                        padding: 5,
                        borderRadius: tokens.radius.lg,
                        boxShadow: tokens.shadow.cardLift,
                    }}
                >
                    <Typography variant={"h5"}
                        sx={{
                            mb: 3,
                            color: tokens.color.onSurface,
                            fontFamily: tokens.font.display,
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
                    />
                    <TextField
                        label={"Passwort"}
                        type={"password"}
                        required
                        value={password}
                        onChange={passwordInput}
                    />
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        disabled={disabled}
                        sx={{
                            background: disabled ? tokens.color.surfaceContainerHighest : tokens.gradient.primaryCta,
                            color: disabled ? tokens.color.onSurfaceVariant : tokens.color.onPrimary,
                            "&:hover": {
                                filter: disabled ? "none" : "brightness(1.1)",
                            },
                        }}
                    >
                        Login
                    </Button>
                    <Link
                        href={"/auth/register"}
                        sx={{
                            color: tokens.color.primary,
                            textAlign: "center",
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            transition: `color ${tokens.transition.base}`,
                            "&:hover": { color: tokens.color.onPrimaryContainer },
                        }}
                    >
                        Registrier dich
                    </Link>
                    <Link
                        href={"/request-new-password"}
                        sx={{
                            color: tokens.color.onSurfaceVariant,
                            textAlign: "center",
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            transition: `color ${tokens.transition.base}`,
                            "&:hover": { color: tokens.color.onSurface },
                        }}
                    >
                        Passwort zurücksetzen
                    </Link>
                </Paper>
                </Box>
            </Box>
        </>
    );
}