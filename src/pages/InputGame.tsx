import PageLayout from "../components/PageLayout";
import {allDummyTeams, allUsers, dummyGamesTableData} from "@/dummyData";
import {InputGameContent} from "@/components/InputGameContent";
import { mapUserModelToUserSimpleVm } from "bff/src/mapper/user.mapper";

export function InputGame(){
    return (
        <PageLayout loggedIn={true} children={< InputGameContent allTeams={allDummyTeams} allUsers={allUsers.map(mapUserModelToUserSimpleVm)} game={dummyGamesTableData[0]} />}
        />
    )
}