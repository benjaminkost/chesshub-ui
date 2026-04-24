import {ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {TeamRole} from "@benaurel/chesshub-core-client";

export interface UserVm {
    id: number;
    name: string;
    userName: string;
    email: string;
    fideID?: string;
    lichessUsername?: string;
    chesscomUsername?: string;
    clubs?: ClubSimpleVm[];
    teams?: TeamMemberVm[];
}

export interface UserSimpleVm {
    id: number;
    name: string;
    userName: string;
}

export interface TeamMemberVm {
    id: number;
    name: string;
    userName?: string;
    roles: TeamRole[];
}