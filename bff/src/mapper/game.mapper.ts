import { GameWithTeamVm, GameMetaData } from "@/types/viewmodels/game.vm";

export const mapGameWithTeamVmToGameMetaData = (game: GameWithTeamVm): GameMetaData => {
    return {
        whitePlayerId: game?.whitePlayerId,
        whitePlayerName: game?.whitePlayerName,
        blackPlayerId: game?.blackPlayerId,
        blackPlayerName: game?.blackPlayerName,
        date: game?.date,
        event: game?.event,
        round: game?.round,
        teamId: game?.teamId,
        teamName: game?.teamName
    }
}