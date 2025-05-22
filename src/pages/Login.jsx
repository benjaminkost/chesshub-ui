import React, {useState} from 'react';
import { _post } from "../../client/apiChessHubCoreClient.js";
import {Link} from "react-router-dom";

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
            <header id="header">
                <h1><a href="/">ChessHub</a></h1>
                <nav className="links">
                    <ul>
                        <li>
                            <Link to = "/auth/register">Register</Link>
                        </li>
                        <li>
                            <Link to = "/uploadImage">Upload Image</Link>
                        </li>
                    </ul>
                </nav>
                <nav className="main">
                    <ul>
                        <li className="search">
                            <a className="fa-search">Search</a>
                            <form id="search" method="get" action="#">
                                <input type="text" name="query" placeholder="Search" />
                            </form>
                        </li>
                        <li className="menu">
                            <a className="fa-bars">Menu</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <article className="post">
                <header>
                    <div className="title">
                        <h1>Login</h1>
                    </div>
                </header>
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
                <Link to = "/uploadImage">Login</Link>
            </button>

            </article>
        </>
    )
}