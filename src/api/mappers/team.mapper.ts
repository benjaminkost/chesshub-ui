import { TeamModel } from "@/types/models/team.model";
import { TeamSimpleVm, TeamVm } from "@/types/viewmodels/team.vm";
import { TeamMemberVm, UserSimpleVm } from "@/types/viewmodels/user.vm";
import { ClubSimpleVm } from "@/types/viewmodels/club.vm";
import {TeamDto, TeamMember, TeamSimple} from "@benaurel/chesshub-core-client";

export const mapTeamModelToTeamVm = (team: TeamModel,
    clubs: Record<number, ClubSimpleVm>,
    users: Record<number, UserSimpleVm>): TeamVm => {
    const { clubId, adminId } = team;

    const adminName = adminId ? users[adminId]?.name : undefined;
    const clubName = clubId ? clubs[clubId]?.name : undefined;

    return {
        id: team.id,
        clubId: team.clubId,
        clubName: clubName,
        name: team.name,
        adminId: team.adminId,
        adminName: adminName,
    }
}

interface MappingContext {
    clubName?: string;
    adminId?: number;
    adminName?: string;
    memberIds?: TeamMemberVm[];
}

export const mapTeamSimpleVmToTeamVm = (team: TeamSimpleVm, clubId: number, context: MappingContext): TeamVm => {
    return {
        ...team,
        clubId: clubId,
        clubName: context?.clubName,
        adminId: context?.adminId,
        adminName: context?.adminName,
        members: context?.memberIds
    }
}

export const mapTeamDtoToTeamSimple = (team: TeamDto):TeamSimple => {
    return {
        id: team.id,
        name: team.name,
        clubName: team.clubName || "",
        adminId: team.adminId
    }
}

export const mapTeamMemberToTeamMemberVm = (teamMember: TeamMember): TeamMemberVm => {
    return {
        id: teamMember.id,
        name: (teamMember.firstName || "") + " " + (teamMember.lastName || ""),
        userName: teamMember.userName,
        roles: teamMember.roles
    }
}

export const mapTeamDtoToTeamVm = (team: TeamDto): TeamVm => {
    return {
        id: team.id,
        clubId: team.clubId,
        clubName: team.clubName,
        name: team.name,
        adminId: team.adminId,
        adminName: team.adminFirstName && team.adminLastName
            ? team.adminFirstName + " " + team.adminLastName
            : undefined,
        members: team.members?.map(mapTeamMemberToTeamMemberVm)
    }
}