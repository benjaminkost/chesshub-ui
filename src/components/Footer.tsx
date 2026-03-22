import { Box, Typography } from "@mui/material";
import "@/styles/App.css";

export interface FooterProps{
    media?: string[],
}

export const defaultMedia = ["Über ChessHub", "Impressum"];

export default function Footer({media=defaultMedia}: FooterProps) {

    return (
        <>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        top: 5,
                        height: 80,
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 -5px 10px rgb(0,0,0,0.1)",
                        backgroundColor: "#bdbdbd",
                        color: "#424242",
                        gap: 4
                }}
                >
                    {
                        media.map((elem) => (
                            <Typography key={elem} sx={{
                                fontWeight: "bold",
                                cursor: "pointer",
                                "&:hover": { color: "primary.main" }
                            }}>
                                {elem}
                            </Typography>
                        ))
                    }
                </Box>
        </>
    )
}