import {allMembers, dummyTeam} from "@/dummyData";
import TeamManagementTable from "@/components/TeamManagementTable";
import PageLayout from "@/components/PageLayout";

export default function TeamManagement(){
    return (
        <PageLayout loggedIn={true} children={<TeamManagementTable
            allUsers={allMembers}
            team={dummyTeam}
        />} />
    );
}