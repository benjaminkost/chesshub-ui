import {Header} from "@/components/Header";
import Footer from "@/components/Footer";
import {Box, Typography} from "@mui/material";
import React from "react";

export function Home() {

    return (
        <>
            <Header loggedIn={false} />

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
            <Footer/>
        </>
    )
}