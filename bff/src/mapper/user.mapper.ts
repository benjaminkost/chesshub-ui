import {UserModel} from "@/types/models/user.model";
import {TeamMemberVm, UserSimpleVm} from "@/types/viewmodels/user.vm";
import {TeamMember, TeamRole} from "@benaurel/chesshub-core-client";

export const mapUserModelToUserSimpleVm = (user: UserModel): UserSimpleVm => {
    return {
        id: user.id,
        name: user.name,
        userName: user.userName
    }
}

export const mapUserSimpleVmToMemberVm = (user: UserSimpleVm, memberRoles: TeamRole[]): TeamMemberVm => {
    return {
        id: user.id,
        name: user.name,
        userName: user.userName,
        roles: memberRoles
    }
}

export const mapUserSimpleVmToTeamMember = (user: UserSimpleVm, memberRoles: TeamRole[]): TeamMember => {
    return {
        id: user.id,
        name: user.name,
        userName: user.userName,
        roles: memberRoles
    }
}