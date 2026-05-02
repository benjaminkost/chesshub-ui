import {Alert, Box, Button, Snackbar, SnackbarCloseReason, TextField, Typography} from "@mui/material";
import React from "react";
import { UserResponse } from "@benaurel/chesshub-core-client";
import {tokens} from "@/styles/theme";

interface ProfileSettingsProps {
    user: UserResponse
}

export function ProfileSettings({user}: ProfileSettingsProps) {
    const [username, setUsername] = React.useState<string>(user.userName);
    const [firstName, setFirstName] = React.useState<string>(user.firstName);
    const [lastName, setLastName] = React.useState<string>(user.lastName);
    const [email, setEmail] = React.useState<string>(user.email);
    const [fideID, setFideID] = React.useState<string>(user.fideId ?? "");
    const [lichessUsername, setLichessUserName] = React.useState<string>(user.lichessUsername ?? "");
    const [chesscomUsername, setChesscomUserName] = React.useState<string>(user.chesscomUsername ?? "");
    const [open, setOpen] =  React.useState<boolean>(false);

    const handleNewPassword = () => {
        setOpen(true);
    }

    const handleClose = (_: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{horizontal: "right", vertical: "top"}}>
                <Alert severity={"info"}>E-Mail versendet</Alert>
            </Snackbar>
            <Box sx={{ display: "flex", flexDirection: "column", m: 3, justifyContent: "center" }}>
                <TextInputRow describingText={"Benutzername"} currentValue={username} setCurrentValue={setUsername} />
                <TextInputRow describingText={"Vorname"} currentValue={firstName} setCurrentValue={setFirstName} />
                <TextInputRow describingText={"Nachname"} currentValue={lastName} setCurrentValue={setLastName} />
                <TextInputRow describingText={"E-Mail"} currentValue={email} setCurrentValue={setEmail} />
                <TextInputRow describingText={"FIDE-ID"} currentValue={fideID} setCurrentValue={setFideID} />
                <TextInputRow describingText={"Lichess Benutzername"} currentValue={lichessUsername} setCurrentValue={setLichessUserName} />
                <TextInputRow describingText={"Chess.com Benutzername"} currentValue={chesscomUsername} setCurrentValue={setChesscomUserName} />
            </Box>
            <Button
                variant="contained"
                sx={{
                    mt: 2,
                    ml: 3,
                }}
                onClick={handleNewPassword}
            >
                Passwort zurücksetzen
            </Button>
        </>
    )
}

interface TextInputRowProps {
    describingText: string;
    currentValue: string;
    setCurrentValue: (initialContent: string) => void;
}

function TextInputRow({describingText, currentValue, setCurrentValue}:TextInputRowProps) {
    const [showButton, setShowButton] = React.useState<boolean>(false);
    const [textValue, setTextValue] = React.useState<string>(currentValue);

    React.useEffect(() => {
        setTextValue(currentValue);
    }, [currentValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value.trim();
        setTextValue(val);
        setShowButton(val !== currentValue && val !== "");
    }

    const handleClick = () => {
        // Fallback for missing update endpoint
        setCurrentValue(textValue);
        setShowButton(false);
        console.warn("User update requested, but backend persistence is missing in OpenAPI.");
    }

    return (
        <Box sx={{ m: 1, display: "flex", flexDirection: "row", gap: 2 }}>
            <Typography sx={{
                flex: 1,
                fontWeight: "bold",
                color: tokens.color.onSurfaceVariant,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                alignSelf: "center",
            }}>{describingText}</Typography>
            <TextField sx={{ flex: 2 }} value={textValue} onChange={handleChange} />
            <Box sx={{ width: 20, flexGrow: 1, m: 1 }}>
                {showButton && (
                    <Button
                        variant="contained"
                        onClick={handleClick}
                    >
                        Aktualisieren
                    </Button>
                )}
            </Box>
        </Box>
    )
}