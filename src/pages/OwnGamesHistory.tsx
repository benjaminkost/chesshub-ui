import {GamesTable} from "@/components/GamesTable";
import {dummyGamesTableData} from "@/dummyData";
import PageLayout from "@/components/PageLayout";

export default function OwnGamesHistory() {

    return (
        <PageLayout loggedIn={true} children={<GamesTable
            rows={dummyGamesTableData} // TODO: muss später aus der datenbank ausgelesen werden
            ownGamesOrTeamGames={true}
        />}
        />
    );
}