import React, {useState} from "react";
import {_post} from "../../bff/clients/apiChessHubCoreClient";
import {Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

export function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [userRegistered, setUserRegistered] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const navigate = useNavigate();

    // Methods
    const EmailInput = (event:React.ChangeEvent<HTMLInputElement>) => {
       setEmail(event.target.value);
    };

    const PasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const ConfirmPasswordInput = (value:string) => {
        setConfirmPassword(value);
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

    const CheckIfPasswordsMatch = (confirmPassword: string) => {


        if (password === confirmPassword) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }

    let statusMessage;

    if(!passwordsMatch && buttonClicked){
        statusMessage = (<Typography sx={{
            color: "red"
        }}>
            Passwords do not match!
        </Typography>);
    } else if(buttonClicked && !userRegistered){
        statusMessage = (<Typography sx={{
            color: "red"
        }}>
            User konnte nicht gespeichert werden
        </Typography>);
    }
        else{
        statusMessage = (<p><br/></p>);
    }

    const registerUser = async () => {
        setButtonClicked(true);

        if(passwordsMatch) {
            const payload = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone
            }
            const value= await _post('/auth/register', payload);

            setUserRegistered(value);

            if (value){
                navigate("/");
            }
        }
    }

    const handleConfirmedPassword = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmedPasswordValue = event.target.value;

        ConfirmPasswordInput(newConfirmedPasswordValue);

        CheckIfPasswordsMatch(newConfirmedPasswordValue);
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
                                    sx={{
                                        color: "#424242"
                                    }}
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
                            onChange={PasswordInput}
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
                            onChange={handleConfirmedPassword}
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
                            onChange={UsernameInput}
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
                            onChange={FirstNameInput}
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
                            onChange={LastNameInput}
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
                            onChange={PhoneInput}
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
            </>
        )
}