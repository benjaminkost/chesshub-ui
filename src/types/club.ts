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
    address?: string;
    admin?: string;
}

export interface ClubAffiliation extends Club{
    status: MemberStatus
}

export interface ClubTeams extends Club{
    teams: Team[];
}