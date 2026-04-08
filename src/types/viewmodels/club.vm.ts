import {MemberStatus} from "@/types/common/enum";
import {TeamModel} from "@/types/models/team.model";

export interface ClubViewModel {
    id: number;
    name: string;
    address?: string;
    adminId?: number;
    adminName?: string;
}

export interface ClubSimpleViewModel {
    id: number;
    name: string;
}

export interface ClubAffiliation extends ClubViewModel {
    status: MemberStatus
}

export interface ClubTeams extends ClubViewModel {
    teams: TeamModel[];
}