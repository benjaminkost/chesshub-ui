import {Header} from "../components/Header.js";
import React from "react";
import Footer from "../components/Footer.js";
import ChessBoard from "../components/ChessBoard.js";
import { Box } from "@mui/material";

export default function ViewSingleGamePage() {
    return (
        <>
            <Header loggedIn={true} />
            <Box sx={{
                flexGrow: 1,
                minHeight: "3vh"
            }}/>
            <ChessBoard />
            <Box sx={{
                flexGrow: 1,
                minHeight: "3.5vh"
            }}/>
            <Footer />
        </>
    );
}