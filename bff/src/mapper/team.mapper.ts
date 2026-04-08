import {TeamModel} from "@/types/models/team.model";
import {TeamSimpleVm, TeamVm} from "@/types/viewmodels/team.vm";
import {Member} from "@/types/viewmodels/user.vm";

export const mapTeamModelToTeamVm = (team: TeamModel) => {
    return {
        id: team.id,
        clubId: team.club.id,
        clubName: team.club.name,
        name: team.name,
        adminId: team?.admin?.id,
        adminName: team?.admin?.name,
        memberIds: team.members
    }
}

interface MappingContext {
    clubName?: string;
    adminId?: number;
    adminName?: string;
    memberIds?: Member[];
}

export const mapTeamSimpleVmToTeamVm = (team: TeamSimpleVm, clubId: number, context:MappingContext):TeamVm => {
    return {
        ...team,
        clubId: clubId,
        clubName: context?.clubName,
        adminId: context?.adminId,
        adminName: context?.adminName,
        members: context?.memberIds
    }
}