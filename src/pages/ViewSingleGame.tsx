import {Header} from "../components/Header.js";
import React from "react";
import Footer from "../components/Footer.js";
import { Box } from "@mui/material";
import GameAnalyzer from "../components/GameAnalyzer.js";
import {dummyPgn} from "../../bff/dummyData.js";

export default function ViewSingleGame() {
    return (
        <>
            <Header loggedIn={true} />
            <Box sx={{
                flexGrow: 1,
                minHeight: "3vh"
            }}/>
            <GameAnalyzer pgn={dummyPgn} />
            <Box sx={{
                flexGrow: 1,
                minHeight: "3.5vh"
            }}/>
            <Footer />
        </>
    );
}