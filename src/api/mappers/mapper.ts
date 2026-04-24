import dayjs from "dayjs";
import {
    GameDto,
    GameRequest,
    UserResponse,
    UserSimple,
    TeamDto,
    Club,
    ClubSimple,
    TeamMember, GamePlayer
} from "@benaurel/chesshub-core-client";
import { GameVm, GameMetaData } from "@/types/viewmodels/game.vm";
import { UserVm, UserSimpleVm, TeamMemberVm } from "@/types/viewmodels/user.vm";
import { TeamVm } from "@/types/viewmodels/team.vm";
import { ClubSimpleVm } from "@/types/viewmodels/club.vm";

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
    const whitePlayer:GamePlayer = {
        id: vm.whitePlayerId,
        firstName: vm.whitePlayerName?.split(" ")[0] || "",
        lastName: vm.whitePlayerName?.split(" ").at(-1) || " "
    }

    const blackPlayer:GamePlayer = {
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

/**
 * User Mappers
 */
export function mapUserToVm(user: UserResponse, clubsSimple: Record<number, ClubSimpleVm>): UserVm {
    const userClubs = Object.values(clubsSimple).filter(club =>
        (user.clubIds || []).includes(club.id)
    );

    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        userName: user.userName,
        email: user.email,
        fideID: user.fideId,
        lichessUsername: user.lichessUsername,
        chesscomUsername: user.chesscomUsername,
        clubs: userClubs
    }
}

export const mapUserSimpleToVm = (user: UserSimple): UserSimpleVm => ({
    id: user.id,
    name: user.name,
    userName: user.userName
});

export const mapTeamMemberToVm = (member: TeamMember): TeamMemberVm => ({
    id: member.id,
    name: (member.firstName || "") + " " + (member.lastName || ""),
    userName: member.userName,
    roles: member.roles || []
});

/**
 * Team Mappers
 */
export const mapTeamToVm = (team: TeamDto): TeamVm => ({
    id: team.id,
    name: team.name,
    clubId: team.clubId,
    clubName: team.clubName,
    adminId: team.adminId,
    adminName: team.adminFirstName && team.adminLastName
        ? team.adminFirstName + " " + team.adminLastName
        : undefined,
    members: team.members?.map(mapTeamMemberToVm)
});

export const mapClubSimpleToVm = (club: ClubSimple | Club): ClubSimpleVm => ({
    id: club.id,
    name: club.name,
});