import React from "react";
import ClubsTable from "@/components/ClubsTable";
import {dummyAllClubs, dummyClubAffiliation} from "@/dummyData";
import PageLayout from "@/components/PageLayout";

export default function ClubAffiliation(){

    return (
        < PageLayout loggedIn={true}
                     children={<ClubsTable allClubs={dummyAllClubs} clubsOfUser={dummyClubAffiliation}/>}
        />
    )
}