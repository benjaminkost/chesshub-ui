import PageLayout from "../components/PageLayout";
import {InputGameByChessBoard} from "@/components/InputGameByChessBoard";

export function InputGameByChessBoardPage(){
    return (
        <PageLayout loggedIn={true} children={< InputGameByChessBoard />}
        />
    )
}