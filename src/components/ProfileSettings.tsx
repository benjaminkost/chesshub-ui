import {Alert, Box, Button, Snackbar, SnackbarCloseReason, TextField, Typography} from "@mui/material";
import React from "react";
import {User} from "@/types/user";

interface ProfileSettingsProps {
    user: User
}

export function ProfileSettings({user}:ProfileSettingsProps) {
    const [username, setUsername] = React.useState<string>(user.userName);
    const [name, setName] = React.useState<string>(user.name);
    const [email, setEmail] = React.useState<string>(user.email);
    const [fideID, setFideID] = React.useState<string>(user.fideID ?? "");
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
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{horizontal: "right", vertical: "top"}}
            >
                <Alert severity={"info"}>
                    Email send
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 3,
                    justifyContent: "center"
                }}
            >
                <TextInputRow describingText={"Benutzername"} currentValue={username} setCurrentValue={setUsername} />
                <TextInputRow describingText={"Name"} currentValue={name} setCurrentValue={setName} />
                <TextInputRow describingText={"Email"} currentValue={email} setCurrentValue={setEmail} />
                <TextInputRow describingText={"Fide-ID"} currentValue={fideID} setCurrentValue={setFideID} />
                <TextInputRow describingText={"Lichess Benutzername"} currentValue={lichessUsername} setCurrentValue={setLichessUserName} />
                <TextInputRow describingText={"Chess.com Benutzername"} currentValue={chesscomUsername} setCurrentValue={setChesscomUserName} />
            </Box>
            <Button sx={{
                mt: 2,
                ml: 3,
                backgroundColor: "lightgray",
                color: "white",
            }}
                    onClick={handleNewPassword}
            >Passwort zurücksetzen</Button>
        </>
    )
}

interface TextInputRowProps {
    describingText: string
    currentValue: string;
    setCurrentValue: (initialContent: string) => void
}

function TextInputRow({describingText, currentValue, setCurrentValue}:TextInputRowProps) {
    const [showButton, setShowButton] = React.useState<boolean>();
    const [textValue, setTextValue] = React.useState<string>(currentValue);

    React.useEffect(() => {
        setTextValue(currentValue);
    }, [currentValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentTextFieldValue = event.target.value.trim();
        setTextValue(currentTextFieldValue);
        if (currentTextFieldValue !== currentValue && currentTextFieldValue !== "") {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }

    const handleClick = () => {
        setCurrentValue(currentValue);
        setShowButton(false);
    }

    return (
        <Box
            sx={{
                m: 1,
                display: "flex",
                flexDirection: "row",
                gap: 2
        }}
        >
            <Typography sx={{flex: 1, fontWeight: "bold"}}>{describingText}</Typography>
            <TextField sx={{flex: 2}} value={textValue} onChange={handleChange} />
            <Box sx={{width: 20, flexGrow: 1, m: 1}}>
                {showButton && <Button onClick={handleClick}
                         sx={{
                             backgroundColor: "gray",
                             color: "white"
                }}>
                Aktualisieren
                </Button>
            }
            </Box>
        </Box>
    )
}