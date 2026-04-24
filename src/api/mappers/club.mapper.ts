import {ClubModel} from "@/types/models/club.model";
import {ClubAffiliationVm, ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {ClubMemberStatus} from "@benaurel/chesshub-core-client";
import {UserSimpleVm} from "@/types/viewmodels/user.vm";

export const mapClubModelToClubAffiliation = (club: ClubModel,
                                              status: ClubMemberStatus, users: Record<number, UserSimpleVm>):ClubAffiliationVm => {
    const { adminId, ...attributes} = club;

    const adminName = adminId ? users[adminId]?.name : undefined;

    return {
        ...attributes,
        adminName: adminName,
        status
    }
}

export const mapClubToSimpleVM = (club: ClubModel):ClubSimpleVm => {

    return {
        id: club.id,
        name: club.name
    }
}