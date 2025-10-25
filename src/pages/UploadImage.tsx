import {_post} from "../../bff/clients/apiChessScoresheetDigitalizationClient.ts";
import {type ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";

export function UploadImage() {

    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(true);

    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0] ) {
            const selectedFile = event.target.files[0]

            setFile(selectedFile);
            setFileUploaded(true);
            console.log(file);
        }
    }

    const uploadImage = () => {
        if(file !== null) {
            const formData = new FormData();
            formData.append("file", file);
            _post('/image/upload', formData);
            console.log(
                "File: ",
                file
            )
        } else {
            setFileUploaded(false);
        }
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
                            <Link to = "/auth/login">Login</Link>
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
                        <h1>Upload your Chess Scoresheet</h1>
                        <p>It will return a Portable Game Notation File</p>
                    </div>
                </header>
                <div>
                    <p>
                        <label>The Process to generated the PGN-File will take some time so do not reload the page</label>
                    </p>
                </div>
                <div>
                    <input type="file" onChange={handleFile}/>
                    <p>
                        <button onClick={uploadImage}>Upload Image</button>
                    </p>
                    <p>
                        {
                            !fileUploaded && "No File selected"
                        }
                    </p>
                </div>
            </article>
            </>
            )
            }