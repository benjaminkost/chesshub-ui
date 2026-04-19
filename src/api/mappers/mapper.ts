import dayjs from "dayjs";
import { 
    Game, 
    GameRequest, 
    User, 
    UserSimple, 
    Team, 
    Club,
    ClubSimple,
    TeamMember
} from "@benaurel/chesshub-core-client";
import { GameVm, GameMetaData } from "@/types/viewmodels/game.vm";
import { UserVm, UserSimpleVm, TeamMemberVm } from "@/types/viewmodels/user.vm";
import { TeamVm } from "@/types/viewmodels/team.vm";
import { ClubSimpleVm } from "@/types/viewmodels/club.vm";
import {useLookup} from "@/context/LookupContext";

/**
 * Game Mappers
 */
export const mapGameToVm = (game: Game): GameVm => ({
    id: game.id!,
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

export const mapGameVmToRequest = (vm: GameMetaData, moves: string): GameRequest => ({
    whitePlayerName: vm.whitePlayerName,
    blackPlayerName: vm.blackPlayerName,
    date: vm.date ? vm.date.format("YYYY-MM-DD") : undefined,
    event: vm.event,
    teamId: vm.teamId,
    moves: moves
});

/**
 * User Mappers
 */
export function mapUserToVm(user: User): UserVm {
    const { clubsSimple } = useLookup();
    const userClubs = Object.values(clubsSimple).filter(club => club.id in (user.clubIds || []));

    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        userName: user.userName!,
        email: user.email!,
        fideID: user.fideId,
        lichessUsername: user.lichessUsername,
        chesscomUsername: user.chesscomUsername,
        clubs: userClubs
    }
}

export const mapUserSimpleToVm = (user: UserSimple): UserSimpleVm => ({
    id: user.id!,
    name: user.name!,
    userName: user.userName!
});

export const mapTeamMemberToVm = (member: TeamMember): TeamMemberVm => ({
    id: member.id!,
    name: member.name!,
    userName: member.userName,
    roles: (member.roles as any) || []
});

/**
 * Team Mappers
 */
export const mapTeamToVm = (team: Team): TeamVm => ({
    id: team.id!,
    name: team.name!,
    clubId: team.clubId,
    clubName: team.clubName,
    members: team.members?.map(mapTeamMemberToVm)
});

export const mapClubSimpleToVm = (club: ClubSimple | Club): ClubSimpleVm => ({
    id: club.id!,
    name: club.name!,
});
