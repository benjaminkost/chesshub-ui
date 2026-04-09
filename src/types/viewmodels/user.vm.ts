import {TeamRole} from "@/types/common/roles";
import {ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {TeamVm} from "@/types/viewmodels/team.vm";

export interface UserVm {
    id: number;
    name: string;
    userName: string;
    email: string;
    fideID?: string;
    lichessUsername?: string;
    chesscomUsername?: string;
    clubs?: ClubSimpleVm[];
    teams?: TeamVm[];
}

export interface UserSimpleVm {
    id: number;
    name: string;
    userName: string;
}

export interface TeamMemberVm {
    id: number;
    name: string;
    username?: string;
    roles: TeamRole[];
}