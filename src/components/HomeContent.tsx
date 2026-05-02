import {Box, Typography} from "@mui/material";
import React from "react";
import {tokens} from "@/styles/theme";

export default function HomeContent(){
    return (
        <Box sx={{
            flexGrow: 1,
            display: "flex",
            minHeight: "80.5vh",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography
                variant={"h1"}
                sx={{
                    textAlign: "center",
                    color: tokens.color.onSurface,
                    fontFamily: tokens.font.display,
                    maxWidth: "700px",
                    lineHeight: 1.15,
                }}
            >
                Schach-Partien können nun einfach gespeichert, analysiert und historisiert werden
            </Typography>
        </Box>
    );
}