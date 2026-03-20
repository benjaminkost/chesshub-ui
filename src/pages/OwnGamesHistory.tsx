import {GamesTable} from "@/components/GamesTable";
import {Header} from "@/components/Header";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import {dummyGamesTableData} from "@/dummyData";

export default function OwnGamesHistory() {

    return (
        <>
            <Header loggedIn={true} />
            <GamesTable
                rows={dummyGamesTableData} // TODO: muss später aus der datenbank ausgelesen werden
                ownGamesOrTeamGames={true}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "48vh"
                }}
            />
            <Footer/>
        </>
    )
}