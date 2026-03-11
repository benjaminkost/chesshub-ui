import {Header} from "../components/Header.js";
import Footer from "../components/Footer.js";
import React, {useState} from "react";
import {Box, Paper, TextField, Typography, Button, Link } from "@mui/material";
import {_post} from "../../bff/clients/apiChessHubCoreClient.js";
import {useNavigate} from "react-router";


export function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const emailOrUsernameInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEmailOrUsername(event.target.value);
    };

    const passwordInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const login = async () => {
        const payload = {
            emailOrUsername: emailOrUsername,
            password: password
        }
        if(_post("auth/signin", payload)) {
            navigate("/");
        }
    }

    let loginButton;

    if(emailOrUsername && password){
        loginButton = (
            <Button
                onClick={login}
                sx={{
                    backgroundColor: "gray",
                    color: "white"
                }}
            >
                Login
            </Button>
        );
    } else {
        loginButton = (
            <Button
                sx={{
                    backgroundColor: "#cfcfcf",
                    color: "white"
                }}
            >
                Login
            </Button>
        );
    }

    return (
        <>
            <Header loggedIn={false}/>
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
                    <TextField
                        label={"Email or Username"}
                        type={"text"}
                        required
                        value={emailOrUsername}
                        onInput={emailOrUsernameInput}
                        sx={{
                            backgroundColor: "white"
                        }}
                    />
                    <TextField
                        label={"Password"}
                        type={"password"}
                        required
                        value={password}
                        onInput={passwordInput}
                        sx={{
                            backgroundColor: "white"
                        }}
                    />
                    {loginButton}
                    <Link
                        href={"/auth/register"}
                        sx={{
                            color: "gray",
                            textAlign: "center"
                        }}
                    >
                        Register dich
                    </Link>
                </Paper>
            </Box>
            <Box sx={{
                flexGrow: 1,
                minHeight: "14vh"
            }}/>
            <Footer/>
        </>
    );
}