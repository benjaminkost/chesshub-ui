import React, {useState} from "react";
import {_post} from "../../bff/clients/apiChessHubCoreClient.ts";
import {Header} from "./Header.jsx";

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

    return (
            <>
                <Header/>
                <article className="post">
                    <header>
                        <div className="title">
                            <h1>Registration</h1>
                        </div>
                    </header>
                    <form>
                        <label htmlFor="email">Email address: </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                value={email}
                                onChange={EmailInput}
                                required
                            />

                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onInput={PasswordInput}
                            className={passwordsDontMatchStyle}
                            required
                        />
                        <label htmlFor="confirmed_password">Confirm Password: </label>
                        <input
                            type="password"
                            id="confirmed_password"
                            name="confirmed_password"
                            value={confirmPassword}
                            onInput={ConfirmPasswordInput}
                            className={passwordsDontMatchStyle}
                            required
                        />
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            value={username}
                            onInput={UsernameInput}
                            required
                        />
                        <label htmlFor="firstname">Firstname: </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={firstName}
                            onInput={FirstNameInput}
                            placeholder="Firstname"
                        />
                        <label htmlFor="lastname">Lastname: </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={lastName}
                            onInput={LastNameInput}
                            placeholder="Lastname"
                        />
                        <label htmlFor="phone">Phone Number: </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onInput={PhoneInput}
                            placeholder="Phone Number"
                        />
                </form>
                <div>
                    <button id="buttonRegistration" type="button" className="btn btn-primary" onClick={() =>{
                        CheckIfPasswordsMatch();
                        if(passwordsMatch === true) {
                            registerUser();
                        }
                    }}>
                        Register
                    </button>
                </div>

                {
                    !passwordsMatch && (
                        <p className="text-danger">
                            Passwords do not match!
                        </p>
                    )
                 }
                 {
                        passwordsMatch && userRegistered && (
                            <p>
                                User registered!
                            </p>
                        )
                 }
                </article>
            </>
        )
}