import PageLayout from "../components/PageLayout";
import {InputGameByChessBoard} from "@/components/InputGameByChessBoard";
import {allUsers, dummyAllClubs} from "@/dummyData";

export function InputGameByChessBoardPage(){
    return (
        <PageLayout loggedIn={true} children={< InputGameByChessBoard allClubs={dummyAllClubs} user={allUsers[0]} />}
        />
    )
}