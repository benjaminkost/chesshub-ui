import {Header} from "@/components/Header";
import {allUsers, dummyTeam} from "@/dummyData";
import {Box} from "@mui/material";
import Footer from "@/components/Footer";
import TeamManagementTable from "@/components/TeamManagementTable";

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