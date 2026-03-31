import React from "react";
import Typography from "@mui/material/Typography";
import {Alert, Box, Button, Grid, Paper, Snackbar, SnackbarCloseReason} from "@mui/material";
import {UploadFile} from "@mui/icons-material";
import {useDropzone} from "react-dropzone";
import {useNavigate} from "react-router-dom";
import {_post} from "../../bff/clients/apiChessHubCoreClient";

export function UploadFileContent() {
    const [pgnContent, setPgnContent] = React.useState<string>("");
    const [fileName, setFileName] = React.useState<string>("");
    const [open, setOpen] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        if (file) {
            setFileName(file.name);

            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target?.result as string;
                setPgnContent(text);
            }

            reader.readAsText(file);
        }
    },[]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {"text/plain": [".pgn", ".txt"], "application/x-chess-pgn": [".pgn"]},
        multiple: false
    });

    const uploadPGN = async () => {
        const response = await _post('/game/pgn', pgnContent);

        if (response) {
            navigate("/view-game");
        } else {
            setOpen(true);
        }
    }

    const handleClose = (_: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal: "right", vertical: "top"}}
                onClose={handleClose}
                open={open}
                autoHideDuration={4000}
            >
                <Alert
                    severity={"error"}
                >
                    Datei konnte nicht hochgeladen werden
                </Alert>
            </Snackbar>
            <Grid container justifyContent="center" alignItems="center" sx={{m: 2}}>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Paper
                            {...getRootProps()}
                            sx={{
                                backgroundColor: isDragActive ? "blue" : "lightgray",
                                border: "2px dotted gray",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                m: 2,
                                height: 400,
                                width: 400
                            }}
                        >
                            <input {...getInputProps()} />
                            <UploadFile sx={{ width: 100, height: 100, color: "gray" }} />
                        </Paper>

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            {fileName && <Typography>{fileName}</Typography>}
                            {pgnContent && <Button variant="contained" onClick={uploadPGN}>Upload</Button>}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
        )
}