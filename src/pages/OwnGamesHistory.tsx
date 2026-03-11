import {GamesTable} from "../components/GamesTable.js";
import {defaultGamesTableData} from "../components/GamesTable.js";
import {Header} from "../components/Header.js";
import Footer from "../components/Footer.js";
import { Box } from "@mui/material";

export default function OwnGamesHistory() {

    return (
        <>
            <Header loggedIn={true} />
            <GamesTable
                rows={defaultGamesTableData} // TODO: muss später aus der datenbank ausgelesen werden
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