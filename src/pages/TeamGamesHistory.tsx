import {Header} from "../components/Header.js";
import {defaultGamesTableData, GamesTable} from "../components/GamesTable.js";
import {Box} from "@mui/material";
import Footer from "../components/Footer.js";

export default function TeamGamesHistory() {
    return (
        <>
            <Header loggedIn={true} />
            <GamesTable
                rows={defaultGamesTableData} // TODO: muss später aus der datenbank ausgelesen werden
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