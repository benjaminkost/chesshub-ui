import { Link } from "react-router-dom";
import {Header, NavLink} from "../components/Header.tsx";

export function Home() {
    const linksValues: NavLink[] = [
        { to: "/auth/register", label: "Register"},
        { to: "/auth/login", label: "Login"}
    ];

    return (
        <>
            <Header links={linksValues}/>
            <article className="post">
                <header>
                    <div className="title">
                        <h1>ChessHub Home</h1>
                    </div>
                </header>
                <nav className="links">
                    <ul>
                        <li>
                            <Link to = "/auth/register">Register</Link>
                        </li>
                        <li>
                            <Link to = "/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link to = "/uploadImage">Upload Image</Link>
                        </li>
                    </ul>
                </nav>
            </article>
        </>
    )
}