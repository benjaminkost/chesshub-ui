import PageLayout from "../components/PageLayout";
import {allDummyTeamsVm, dummyGamesTableData} from "@/dummyData";
import {InputGameContent} from "@/components/InputGameContent";

export function InputGame(){
    return (
        <PageLayout children={< InputGameContent allTeams={allDummyTeamsVm} game={dummyGamesTableData[0]} />}
        />
    )
}