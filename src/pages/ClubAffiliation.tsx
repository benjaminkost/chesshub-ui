import {Header} from "@/components/Header";
import {Box} from "@mui/material";
import Footer from "@/components/Footer";
import React from "react";
import ClubsTable from "../components/ClubsTable.js";
import {dummyAllClubs, dummyClubAffiliation} from "@/dummyData";

export default function ClubAffiliation(){

    return (
        <>
            <Header loggedIn={true} />
            <Box sx={{
                flexGrow: 1,
                minHeight: "3vh"
            }}/>
            <ClubsTable allClubs={dummyAllClubs} clubsOfUser={dummyClubAffiliation}/>
            <Box sx={{
                flexGrow: 1,
                minHeight: "3.5vh"
            }}/>
            <Footer />
        </>
    )
}