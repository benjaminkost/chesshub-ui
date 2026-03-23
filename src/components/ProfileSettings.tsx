import {Box, IconButton, TextField, Typography} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function ProfileSettings() {
    const [username, setUsername] = React.useState<string>("benboomer");
    const [name, setName] = React.useState<string>("Benjamin Kostka");
    const [email, setEmail] = React.useState<string>("mail@ben-kostka.de");
    const [fideID, setFideID] = React.useState<string>("1234567890");
    const [lichessUsername, setLichessUserName] = React.useState<string>("benboomer02");
    const [chesscomUsername, setChesscomUserName] = React.useState<string>("benboomer03");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                m: 2,
                justifyContent: "center"
            }}
        >
            <TextInputRow describingText={"Username"} initialContent={username} setInitialContent={setUsername} />
        </Box>
    )
}

interface TextInputRowProps {
    describingText: string
    initialContent: string;
    setInitialContent: (initialContent:string) => void
}

function TextInputRow({describingText, initialContent, setInitialContent}:TextInputRowProps) {
    let value = false;
    const valueChanged:boolean = React.useMemo(() => {
        return !value;
    }, [initialContent]);

    return (
        <Box
            sx={{
                m:1,
                display: "flex",
                flexDirection: "row"
            }}
        >
            <Typography sx={{flex: 1}}>{describingText}</Typography>
            <TextField sx={{flex: 2}} onChange={() => {setInitialContent(initialContent);value = !value;}}>{initialContent}</TextField>
            {
                value &&
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
            }
        </Box>
    )
}