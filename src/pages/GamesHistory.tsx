import {GamesTable} from "../components/GamesTable.js";
import {defaultGamesTableData} from "../components/GamesTable.js";
import {Header} from "../components/Header.js";
import Footer from "../components/Footer.js";
import { Box } from "@mui/material";

function GamesHistory() {

    return (
        <>
            <Header loggedIn={true} />
            <GamesTable rows={defaultGamesTableData}/>
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

export default GamesHistory