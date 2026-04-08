import {ClubModel} from "@/types/models/club.model";
import {ClubAffiliationVm, ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {ClubMemberStatus} from "@/types/common/roles";

export const mapClubModelToClubAffiliation = (club: ClubModel, status: ClubMemberStatus):ClubAffiliationVm => {
    const { admin, ...attributes} = club;

    return {
        ...attributes,
        adminId: admin?.id,
        adminName: admin?.name,
        status
    }
}

export const mapClubToSimpleVM = (club: ClubModel):ClubSimpleVm => {

    return {
        id: club.id,
        name: club.name
    }
}