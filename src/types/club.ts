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