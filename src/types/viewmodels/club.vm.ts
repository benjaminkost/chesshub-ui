import {ClubMemberStatus} from "@/types/common/roles";
import {TeamVm} from "@/types/viewmodels/team.vm";

export interface ClubVm {
    id: number;
    name: string;
    address?: string;
    adminId?: number;
    adminName?: string;
}

export interface ClubSimpleVm {
    id: number;
    name: string;
}

export interface ClubAffiliationVm extends ClubVm {
    status: ClubMemberStatus;
}

export interface ClubWithTeamsVm extends ClubVm {
    teams: TeamVm[];
}