import {Box, Button, TextField, Typography} from "@mui/material";
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                m: 3,
                justifyContent: "center"
            }}
        >
            <TextInputRow describingText={"Benutzername"} initialContent={username} setInitialContent={setUsername} />
            <TextInputRow describingText={"Name"} initialContent={name} setInitialContent={setName} />
            <TextInputRow describingText={"Email"} initialContent={email} setInitialContent={setEmail} />
            <TextInputRow describingText={"Fide-ID"} initialContent={fideID} setInitialContent={setFideID} />
            <TextInputRow describingText={"Lichess Benutzername"} initialContent={lichessUsername} setInitialContent={setLichessUserName} />
            <TextInputRow describingText={"Chess.com Benutzername"} initialContent={chesscomUsername} setInitialContent={setChesscomUserName} />
        </Box>
    )
}

interface TextInputRowProps {
    describingText: string
    initialContent: string;
    setInitialContent: (initialContent: string) => void
}

function TextInputRow({describingText, initialContent, setInitialContent}:TextInputRowProps) {
    const [showButton, setShowButton] = React.useState<boolean>();
    const [textValue, setTextValue] = React.useState<string>(initialContent);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentTextFieldValue = event.target.value;
        setTextValue(currentTextFieldValue);
        if (currentTextFieldValue !== initialContent && currentTextFieldValue.trim()) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }

    const handleClick = () => {
        setInitialContent(textValue);
        setShowButton(false);
        debugger
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