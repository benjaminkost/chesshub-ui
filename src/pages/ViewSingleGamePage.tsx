import {Header} from "../components/Header.js";
import React from "react";
import Footer from "../components/Footer.js";
import ChessBoard from "../components/ChessBoard.js";

export default function ViewSingleGamePage() {
    return (
        <>
            <Header loggedIn={true} />
            <ChessBoard heightWidth={600} config={{orientation: "white", fen: "2r2k2/5p2/4pP2/1KP1P3/4N1Pp/7P/8/8 b - - 4 63"}}/>
            <Footer />
        </>
    );
}