import React from "react";
import ClubsTable from "@/components/ClubsTable";
import {dummyAllClubs, dummyClubAffiliation} from "@/dummyData";
import PageLayout from "@/components/PageLayout";
import {mapClubToSimpleVM} from "../../bff/src/mapper/club.mapper";

export default function ClubAffiliation(){

    return (
        < PageLayout children={<ClubsTable allClubs={dummyAllClubs.map(mapClubToSimpleVM)} clubsOfUser={dummyClubAffiliation}/>}
        />
    )
}