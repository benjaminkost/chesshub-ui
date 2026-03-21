import React from "react";
import GameAnalyzer from "@/components/GameAnalyzer";
import {dummyPgn} from "@/dummyData";
import PageLayout from "@/components/PageLayout";

export default function ViewSingleGame() {
    return (
        <PageLayout loggedIn={true} children={<GameAnalyzer pgn={dummyPgn} />} />
    );
}