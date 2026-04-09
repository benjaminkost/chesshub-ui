import React from "react";
import {ChessBoardEditor} from "@/components/ChessBoardEditor";
import {
    allDummyTeamsVm,
    dummyGamesTableData,
} from "@/dummyData";
import PageLayout from "@/components/PageLayout";

export default function ViewSingleGame() {
    return (
        <PageLayout loggedIn={true} children={<ChessBoardEditor allTeams={allDummyTeamsVm}
                                                                game={dummyGamesTableData[0]} />} />
    );
}