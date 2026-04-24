import {TeamMemberVm} from "@/types/viewmodels/user.vm";

export interface TeamVm {
    id: number;
    clubId: number;
    clubName?: string;
    name: string;
    adminId?: number;
    adminName?: string;
    members?: TeamMemberVm[];
}

export interface TeamSimpleVm {
    id: number;
    name: string;
    clubName: string;
    adminId?: number;
}