import {ClubModel} from "@/types/models/club.model";
import {ClubAffiliation, ClubSimpleViewModel} from "@/types/viewmodels/club.vm";
import {MemberStatus} from "@/types/common/enum";

export const mapClubModelToClubAffiliation = (club: ClubModel, status: MemberStatus):ClubAffiliation => {
    const { admin, ...attributes} = club;

    return {
        ...attributes,
        adminId: admin?.id,
        adminName: admin?.name,
        status
    }
}

export const mapClubToSimpleVM = (club: ClubModel):ClubSimpleViewModel => {

    return {
        id: club.id,
        name: club.name
    }
}