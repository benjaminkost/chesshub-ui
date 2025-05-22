import {useState} from "react";
import "../styles/Registration.css"
import {_post} from "../../client/apiChessHubCoreClient.js";
import {Link} from "react-router-dom";

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
    const EmailInput = (event) => {
       setEmail(event.target.value);
    };

    const PasswordInput = (event) => {
        setPassword(event.target.value);
    };

    const ConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
    }

    const UsernameInput = (event) => {
        setUsername(event.target.value);
    };

    const FirstNameInput = (event) => {
        setFirstName(event.target.value);
    }

    const LastNameInput = (event) => {
        setLastName(event.target.value);
    }

    const PhoneInput = (event) => {
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
                <header id="header">
                    <h1><a href="/">ChessHub</a></h1>
                    <nav className="links">
                        <ul>
                            <li>
                                <Link to = "/auth/login">Login</Link>
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
                            <h1>Registration</h1>
                        </div>
                    </header>
                    <p>
                            <label htmlFor="email">Email address: </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                value={email}
                                onInput={EmailInput}
                                required
                            />
                    </p>

                    <p>
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
                    </p>
                    <p>
                        <label htmlFor="comnfirmed_password">Confirm Password: </label>
                        <input
                            type="password"
                            id="confirmed_password"
                            name="confirmed_password"
                            value={confirmPassword}
                            onInput={ConfirmPasswordInput}
                            className={passwordsDontMatchStyle}
                            required
                        />
                    </p>
                    <p>
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
                    </p>

                    <p>
                            <label htmlFor="firstname">Firstname: </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={firstName}
                                onInput={FirstNameInput}
                                placeholder="Firstname"
                            />
                    </p>
                    <p>
                            <label htmlFor="lastname">Lastname: </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={lastName}
                                onInput={LastNameInput}
                                placeholder="Lastname"
                            />
                    </p>
                <p>
                    <label htmlFor="phone">Phone Number: </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onInput={PhoneInput}
                        placeholder="Phone Number"
                    />
                </p>
                <div>
                    <button onClick={() =>{
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
                        <p className="error-message-values">
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