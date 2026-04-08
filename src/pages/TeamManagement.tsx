import {allUsers, dummyTeamVm} from "@/dummyData";
import TeamManagementTable from "@/components/TeamManagementTable";
import PageLayout from "@/components/PageLayout";

export default function TeamManagement(){
    return (
        <PageLayout loggedIn={true} children={<TeamManagementTable
            allUsers={allUsers}
            team={dummyTeamVm}
        />} />
    );
}