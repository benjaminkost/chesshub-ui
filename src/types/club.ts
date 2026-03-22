import {Team} from "@/types/team";

export enum MemberStatus{
    APPLICANT,
    MEMBER,
    FORMER_MEMBER,
    BANNED
}

export interface Club{
    id: number;
    name: string;
    address: string;
    president?: string;
}

export interface ClubAffiliation{
    id: number;
    name: string;
    address: string;
    president?: string;
    status: MemberStatus
}

export interface ClubTeams {
    id: number;
    name: string;
    president?: string;
    teams: Team[];
}