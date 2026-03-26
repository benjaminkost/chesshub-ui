import PageLayout from "../components/PageLayout";
import {InputGameByChessBoard} from "@/components/InputGameByChessBoard";
import {allDummyTeams, allUsers} from "@/dummyData";

export function InputGameByChessBoardPage(){
    return (
        <PageLayout loggedIn={true} children={< InputGameByChessBoard allTeams={allDummyTeams} user={allUsers[0]} />}
        />
    )
}