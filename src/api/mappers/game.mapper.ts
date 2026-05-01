import {GameMetaData, GameVm, GameWithTeamVm} from "@/types/viewmodels/game.vm";
import {GameDto, GamePlayer, GameRequest} from "@benaurel/chesshub-core-client";
import dayjs from "dayjs";

export const mapGameWithTeamVmToGameMetaData = (game: GameWithTeamVm): GameMetaData => {
    return {
        whitePlayerId: game.whitePlayerId,
        whitePlayerName: game.whitePlayerName,
        blackPlayerId: game.blackPlayerId,
        blackPlayerName: game.blackPlayerName,
        date: game.date,
        event: game.event,
        round: game.round,
        teamId: game.teamId,
        teamName: game.teamName
    }
}
/**
 * Game Mappers
 */
export const mapGameToVm = (game: GameDto): GameVm => ({
    id: game.id,
    whitePlayerId: game.whitePlayerId,
    blackPlayerId: game.blackPlayerId,
    whitePlayerName: game.whitePlayerName,
    blackPlayerName: game.blackPlayerName,
    date: game.date ? dayjs(game.date) : null,
    opening: game.opening,
    event: game.event,
    site: game.site,
    board: game.board,
    result: game.result,
    round: game.round,
    moves: game.moves || "",
});
export const mapGameVmToRequest = (vm: GameMetaData, moves: string): GameRequest => {
    const whitePlayer: GamePlayer = {
        id: vm.whitePlayerId,
        firstName: vm.whitePlayerName?.split(" ")[0] || "",
        lastName: vm.whitePlayerName?.split(" ").at(-1) || " "
    }

    const blackPlayer: GamePlayer = {
        id: vm.blackPlayerId,
        firstName: vm.blackPlayerName?.split(" ")[0] || "",
        lastName: vm.blackPlayerName?.split(" ").at(-1) || " "
    }
    return {
        whitePlayer: whitePlayer,
        blackPlayer: blackPlayer,
        date: vm.date ? vm.date.format("YYYY-MM-DD") : undefined,
        event: vm.event,
        teamId: vm.teamId,
        moves: moves
    }
};