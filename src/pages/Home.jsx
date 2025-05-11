import { Link } from "react-router-dom";


export function Home() {

    return (
        <>
            <h1>ChessHub</h1>
            <nav>
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
        </>
    )
}