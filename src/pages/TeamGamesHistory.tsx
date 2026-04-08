import {GamesTable} from "@/components/GamesTable";
import {dummyGamesTableData} from "@/dummyData";
import PageLayout from "@/components/PageLayout";

export default function TeamGamesHistory() {
    const userTeam = "SV Empor"; // TODO: muss später mit user daten ausgelesen werden

    const teamGames = dummyGamesTableData.filter(game => game.teamName === userTeam);

    return (
        <PageLayout loggedIn={true} children={
            <GamesTable
            games={teamGames}
            ownGamesOrTeamGames={false}
        />} />
    );
}