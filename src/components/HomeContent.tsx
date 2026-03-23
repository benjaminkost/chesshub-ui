import {Box, Typography} from "@mui/material";
import React from "react";

export default function HomeContent(){
    return (
        <Box sx={{
            flexGrow: 1,
            display: "flex",
            minHeight: "80.5vh",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography color={"#bdbdbd"} variant={"h1"}
                        sx={{
                            textAlign: "center"
                        }}
            >
                Schach-Partien können nun einfach gespeichert, analysiert und historisiert werden
            </Typography>
        </Box>
    );
}