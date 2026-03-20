import {Header} from "@/components/Header";
import {GamesTable} from "@/components/GamesTable";
import {Box} from "@mui/material";
import Footer from "@/components/Footer";
import {dummyGamesTableData} from "@/dummyData";

export default function TeamGamesHistory() {
    return (
        <>
            <Header loggedIn={true} />
            <GamesTable
                rows={dummyGamesTableData} // TODO: muss später aus der datenbank ausgelesen werden
                ownGamesOrTeamGames={false}
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