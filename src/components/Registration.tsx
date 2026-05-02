import React, { useState } from "react";
import { Box, Button, Link, Paper, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/clients/apiChesshubCore";
import { RegisterRequest } from "@benaurel/chesshub-core-client";
import { tokens } from "@/styles/theme";

export function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userRegistered, setUserRegistered] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPassword(val);
        setPasswordsMatch(val === confirmPassword);
    };
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setConfirmPassword(val);
        setPasswordsMatch(val === password);
    };
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value);
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value);
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => setPhone(event.target.value);

    const registerUser = async () => {
        setError(null);
        if (!passwordsMatch) {
            setError("Die Passwörter stimmen nicht überein!");
            return;
        }

        try {
            const registerRequest: RegisterRequest = {
                userName: username,
                password,
                email,
                firstName,
                lastName,
                phoneNumber: phone
            };

            await authApi.register(registerRequest);
            setUserRegistered(true);
            setTimeout(() => {
                navigate("/auth/login");
            }, 2000);
        } catch (err: any) {
            console.error("Registration failed:", err);
            const backendMessage = err.response?.data?.message || err.response?.data?.error;
            setError(backendMessage ? `Fehler: ${backendMessage}` : "Benutzer konnte nicht gespeichert werden. Bitte überprüfe deine Eingaben.");
        }
    };

    const isFormValid = email && password && confirmPassword && username && firstName && lastName && passwordsMatch;

    return (
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
            <Paper sx={{
                display: "flex",
                mt: 4,
                flexGrow: 1,
                flexDirection: "column",
                gap: 2,
                maxWidth: "sm",
                mb: 3,
                backgroundColor: tokens.color.surfaceContainerHighest,
                padding: 5,
                borderRadius: tokens.radius.lg,
                boxShadow: tokens.shadow.cardLift,
            }}>
                <Typography variant={"h5"} sx={{
                    color: tokens.color.onSurface,
                    fontFamily: tokens.font.display,
                    mb: 2,
                }}>
                    Registrierung
                </Typography>

                {userRegistered && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Registrierung erfolgreich! Du wirst zum Login weitergeleitet...
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField label={"E-Mail Adresse"} type="email" value={email} onChange={handleEmailChange} required />
                <TextField label={"Passwort"} type="password" value={password} onChange={handlePasswordChange} required />
                <TextField
                    label={"Passwort bestätigen"}
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!passwordsMatch}
                    helperText={!passwordsMatch ? "Passwörter stimmen nicht überein" : ""}
                    required
                />
                <TextField label={"Benutzername"} value={username} onChange={handleUsernameChange} required />
                <TextField label={"Vorname"} value={firstName} onChange={handleFirstNameChange} />
                <TextField label={"Nachname"} value={lastName} onChange={handleLastNameChange} />
                <TextField label={"Telefonnummer"} value={phone} onChange={handlePhoneChange} />

                <Button
                    onClick={registerUser}
                    disabled={!isFormValid || userRegistered}
                    variant="contained"
                    sx={{
                        background: isFormValid && !userRegistered ? tokens.gradient.primaryCta : tokens.color.surfaceContainerHighest,
                        color: isFormValid && !userRegistered ? tokens.color.onPrimary : tokens.color.onSurfaceVariant,
                        "&:hover": {
                            filter: isFormValid ? "brightness(1.1)" : "none",
                        },
                    }}
                >
                    Registrieren
                </Button>

                <Link
                    href={"/auth/login"}
                    sx={{
                        mt: 1,
                        color: tokens.color.primary,
                        textAlign: "center",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        transition: `color ${tokens.transition.base}`,
                        "&:hover": { color: tokens.color.onPrimaryContainer },
                    }}
                >
                    Bereits ein Konto? Hier einloggen
                </Link>
            </Paper>
            </Box>
        </Box>
    );
}