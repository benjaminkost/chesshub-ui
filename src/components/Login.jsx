import React, {useState} from 'react';
import { _post } from "../../client/apiChessHubCoreClient.js";

export function Login() {
    // Constants
    const [emailOrUsername, setemailOrUsername] = useState("");
    const [password, setPassword] = useState("");

    // Methods
    const EmailOrUsernameInput = (event) => {
        setemailOrUsername(event.target.value);
    }
    const PasswordInput = (event) => {
        setPassword(event.target.value);
    }

    const loginUser = () => {
        const payload = {usernameOrEmail: emailOrUsername,
            password: password}
        _post('/auth/login', payload);
    }

    return (
        <>
            <h1>Login</h1>
            <p>
                <label>Email or Username</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email or Username"
                    value={emailOrUsername}
                    onInput={EmailOrUsernameInput}
                    required
                />
            </p>
            <p>
                <label>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onInput={PasswordInput}
                    required
                />
            </p>

            <button onClick={loginUser}>
                Login
            </button>
        </>
    )
}