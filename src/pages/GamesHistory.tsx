import {GamesTable} from "../components/GamesTable.js";
import {defaultGamesTableData} from "../components/GamesTable.js";
import {Header} from "../components/Header.js";
import Footer from "../components/Footer.js";

function GamesHistory() {


    return (
        <>
            <Header loggedIn={true} />
            <GamesTable rows={defaultGamesTableData}/>
            <Footer/>
        </>
    )
}

export default GamesHistory