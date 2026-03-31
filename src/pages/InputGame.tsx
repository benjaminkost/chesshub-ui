import PageLayout from "../components/PageLayout";
import {allDummyTeams, allUsers} from "@/dummyData";
import {InputGameContent} from "@/components/InputGameContent";

export function InputGame(){
    return (
        <PageLayout loggedIn={true} children={< InputGameContent allTeams={allDummyTeams} user={allUsers[0]} />}
        />
    )
}