import {GamesTable} from "@/components/GamesTable";
import {dummyGamesTableData} from "@/dummyData";
import PageLayout from "@/components/PageLayout";

export default function OwnGamesHistory() {
    const userName = "Benjamin Kostka";
    const userGames = dummyGamesTableData.filter(games => games.whitePlayerName === userName || games.blackPlayerName === userName);

    return (
        <PageLayout children={<GamesTable
            games={userGames} // TODO: muss später aus der datenbank ausgelesen werden
            ownGamesOrTeamGames={true}
        />}
        />
    );
}