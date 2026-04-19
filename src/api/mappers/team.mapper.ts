import { TeamModel } from "@/types/models/team.model";
import { TeamSimpleVm, TeamVm } from "@/types/viewmodels/team.vm";
import { TeamMemberVm, UserSimpleVm } from "@/types/viewmodels/user.vm";
import { ClubSimpleVm } from "@/types/viewmodels/club.vm";

export const mapTeamModelToTeamVm = (team: TeamModel,
    clubs: Record<number, ClubSimpleVm>,
    users: Record<number, UserSimpleVm>): TeamVm => {
    const { clubId, adminId } = team;

    const adminName = adminId && users[adminId]?.name || undefined;
    const clubName = clubId && clubs[clubId]?.name || undefined;

    return {
        id: team.id,
        clubId: team.clubId,
        clubName: clubName,
        name: team.name,
        adminId: team?.adminId,
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