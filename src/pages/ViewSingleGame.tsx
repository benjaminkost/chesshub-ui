import React from "react";
import {ChessBoardEditor} from "@/components/ChessBoardEditor";
import {allDummyTeams, allUsers, dummyDate, dummyEvent, dummyPgn, dummyRound, dummyTeam} from "@/dummyData";
import PageLayout from "@/components/PageLayout";

export default function ViewSingleGame() {
    return (
        <PageLayout loggedIn={true} children={<ChessBoardEditor allTeams={allDummyTeams}
                                                                user={allUsers[0]}
                                                                initialWhitePlayer={allUsers[0].name}
                                                                initialBlackPlayer={allUsers[1].name}
                                                                initialDate={dummyDate}
                                                                initialEvent={dummyEvent}
                                                                initialRound={dummyRound}
                                                                initialTeam={dummyTeam}
                                                                initialMoves={dummyPgn} />} />
    );
}