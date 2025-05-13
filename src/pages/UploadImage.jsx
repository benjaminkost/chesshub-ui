import {_post} from "../../client/apiChessScoresheetDigitalizationClient";
import {useState} from "react";

export function UploadImage() {

    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(true);
    const [pgn, setPgn] = useState("");

    const handleFile = (event) => {
        setFile(event.target.files[0]);
        setFileUploaded(true);
        console.log(file);
    }

    const uploadImage = async () => {
        if(file !== null) {
            const formData = new FormData();
            formData.append("file", file);
            const response = await _post('/image/upload', formData);
            console.log(
                "File: ",
                file
            )

            const result = await response.data;
            console.log("API-result: ", result);
            setPgn(result)
        } else {
            setFileUploaded(false);
        }
    }

    return (
        <>
            <div>
                <input type="file" onChange={handleFile}/>
                <p>
                    <button onClick={uploadImage}>Upload Image</button>
                </p>
                <p className="error-message-values">
                    {
                        !fileUploaded && "No File selected"
                    }
                </p>
            </div>
            <div>
                <p>
                    {
                        fileUploaded && pgn
                    }
                </p>
            </div>
        </>
    )
}