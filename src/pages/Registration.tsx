import React, {useState} from "react";
import {_post} from "../../bff/clients/apiChessHubCoreClient.ts";
import {Header} from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import {Box, Button, Link, Paper, TextField, Typography } from "@mui/material";

export function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const passwordsDontMatchStyle = !passwordsMatch ? "field-style error" : "field-style";
    const [userRegistered, setUserRegistered] = useState(false);

    // Methods
    const EmailInput = (event:React.ChangeEvent<HTMLInputElement>) => {
       setEmail(event.target.value);
    };

    const PasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const ConfirmPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const UsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const FirstNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const LastNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const PhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const CheckIfPasswordsMatch = () => {
        setPasswordsMatch(true);
        if (password === confirmPassword) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }

    const registerUser = async () => {
        CheckIfPasswordsMatch()
        if(passwordsMatch === true) {
            const payload = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone
            }

            setUserRegistered(_post('/auth/register', payload));
        }
    }

    let statusMessage;

    if(!passwordsMatch){
        statusMessage = (<Typography sx={{
            color: "red"
        }}>
            Passwords do not match!
        </Typography>);
    } else if(passwordsMatch && userRegistered){
        statusMessage = (
                <Typography
                    sx={{
                        color: "green"
                    }}
                >
                    User registered!
                </Typography>
            );
    } else {
        statusMessage = (<p><br/></p>);
    }

    let registerButton;

    if (email && password && confirmPassword && username){
        registerButton = (<Button
            id="buttonRegistration"
            type="button"
            onClick={registerUser}
            sx={{
                color: "white",
                backgroundColor: "gray"
            }}
        >
            Register
        </Button>);
    } else {
        registerButton = (<Button
            id="buttonRegistration"
            type="button"
            sx={{
                color: "white",
                backgroundColor: "#cfcfcf"
        }}
        >
            Register
        </Button>);
    }

    return (
            <>
                <Header loggedIn={true}/>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Paper sx={{
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
                    }}>
                        <Typography variant={"h5"}
                        >
                            Registration
                        </Typography>
                        <TextField
                            label={"Email address"}
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={EmailInput}
                            required
                            sx={{
                                backgroundColor: "white"
                            }}
                        />

                        <TextField
                            label={"Password"}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onInput={PasswordInput}
                            className={passwordsDontMatchStyle}
                            required
                            sx={{
                                backgroundColor: "white"
                            }}
                        />
                        <TextField
                            label={"Confirmed Password"}
                            type="password"
                            id="confirmed_password"
                            name="confirmed_password"
                            value={confirmPassword}
                            onInput={ConfirmPasswordInput}
                            className={passwordsDontMatchStyle}
                            required
                            sx={{
                                backgroundColor: "white"
                            }}
                        />
                        <TextField
                            label={"Username"}
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onInput={UsernameInput}
                            required
                            sx={{
                                backgroundColor: "white"
                            }}
                        />
                        <TextField
                            label={"Firstname"}
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={firstName}
                            onInput={FirstNameInput}
                            sx={{
                                backgroundColor: "white"
                            }}
                        />
                        <TextField
                            label={"Lastname"}
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={lastName}
                            onInput={LastNameInput}
                            sx={{
                                backgroundColor: "white"
                            }}
                        />
                        <TextField
                            label={"Phone Number"}
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onInput={PhoneInput}
                            sx={{
                                backgroundColor: "white"
                            }}
                        />
                        {registerButton}
                        <Link
                            href={"/auth/login"}
                            sx={{
                                mt: -2,
                                color: "gray",
                                display: "inline-block",
                                textAlign: "center"
                            }}
                        >
                            Log dich hier ein
                        </Link>
                        <Box>
                            {statusMessage}
                        </Box>
                    </Paper>
                </Box>
                <Footer/>
            </>
        )
}