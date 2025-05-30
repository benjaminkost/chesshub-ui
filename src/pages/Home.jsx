import { Link } from "react-router-dom";


export function Home() {

    return (
        <>
            <header id="header">
                <h1><a href="/">ChessHub</a></h1>
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