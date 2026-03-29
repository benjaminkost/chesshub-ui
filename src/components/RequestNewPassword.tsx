import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export function RequestNewPassword() {
    const [email, setEmail] = React.useState<string>();
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleEmailRequest = () => {
        navigate("/");
    }

    return (
        <Grid container>
            <Grid size={4}/>
            <Grid size={4}>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "lightgray",
                        justifyContent: "center",
                        mt: 20,
                        width: 400
                    }}
                >
                    <Typography variant={"h5"} sx={{m: 2}}>Gebe deine Email ein:</Typography>
                    <TextField sx={{m: 2, backgroundColor: "white"}} value={email} placeholder={"Email address..."} onChange={handleEmailChange} />
                    <Button
                        sx={{
                            backgroundColor: "darkgray",
                            color: "white",
                            m: 3
                        }}
                        onClick={handleEmailRequest}
                    >Neues Passwort anfragen</Button>
                </Paper>
            </Grid>
            <Grid size={4}/>
        </Grid>
    )
}