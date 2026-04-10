import PageLayout from "@/components/PageLayout";
import ClubManagementTable from "@/components/ClubManagementTable";
import {dummyClubTeams} from "@/dummyData";

export default function ClubManagement() {
    return (
        <PageLayout children={<ClubManagementTable club={dummyClubTeams}/>}/>
    )
}