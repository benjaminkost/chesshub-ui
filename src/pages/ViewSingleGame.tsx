import {Header} from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import GameAnalyzer from "@/components/GameAnalyzer";
import {dummyPgn} from "@/dummyData";

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