import {Header} from "../components/Header.js";
import {allUsers, dummyTeam} from "../dummyData.js";
import {Box} from "@mui/material";
import Footer from "../components/Footer.js";
import TeamManagementTable from "../components/TeamManagementTable.js";

export default function TeamManagement(){
    return (
        <>
            <Header loggedIn={true} />
            <TeamManagementTable
                allUsers={allUsers}
                team={dummyTeam}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "30vh"
                }}
            />
            <Footer/>
        </>
    )
}