import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes";
import {tokens} from "@/styles/theme";

export function RequestNewPassword() {
    const [email, setEmail] = React.useState<string>();
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleEmailRequest = () => {
        navigate(ROUTES.HOME.func());
    }

    return (
        <Grid container>
            <Grid size={4}/>
            <Grid size={4}>
                <Box
                    sx={{
                        backgroundColor: tokens.color.surfaceContainerLow,
                        padding: 3,
                        borderRadius: tokens.radius.xl,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 20,
                    }}
                >
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: tokens.color.surfaceContainerHighest,
                        color: tokens.color.onSurface,
                        justifyContent: "center",
                        width: 400,
                        borderRadius: tokens.radius.lg,
                        boxShadow: tokens.shadow.cardLift,
                    }}
                >
                    <Typography variant={"h5"} sx={{
                        m: 2,
                        color: tokens.color.onSurface,
                        fontFamily: tokens.font.display,
                    }}>Gebe deine Email ein:</Typography>
                    <TextField sx={{m: 2}} value={email} placeholder={"Email address..."} onChange={handleEmailChange} />
                    <Button
                        variant="contained"
                        sx={{ m: 3 }}
                        onClick={handleEmailRequest}
                    >Neues Passwort anfragen</Button>
                </Paper>
                </Box>
            </Grid>
            <Grid size={4}/>
        </Grid>
    )
}