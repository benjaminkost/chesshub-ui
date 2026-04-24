import {UserModel} from "@/types/models/user.model";
import {TeamMemberVm, UserSimpleVm, UserVm} from "@/types/viewmodels/user.vm";
import {TeamMember, TeamRole, UserResponse} from "@benaurel/chesshub-core-client";

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
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ").at(-1),
        userName: user.userName,
        roles: memberRoles
    }
}

export const mapUserResponseToUserVm = (user: UserResponse):UserVm => {
    // TODO: clubs, teams must be set
    return {
        id: user.id,
        name: user.firstName + " " + user.lastName,
        userName: user.userName,
        email: user.email,
        fideID: user.fideId,
        lichessUsername: user.lichessUsername,
        chesscomUsername: user.chesscomUsername,
    }
}
