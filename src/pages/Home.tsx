import { Link } from "react-router-dom";

export function Home() {

    return (
        <>
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