import {MemberStatus} from "@/types/common/enum";
import {TeamVm} from "@/types/viewmodels/team.vm";

export interface ClubVm {
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

export interface ClubAffiliation extends ClubVm {
    status: MemberStatus
}

export interface ClubTeams extends ClubVm {
    teams: TeamVm[];
}