import {ClubRole, MemberStatus} from "@/types/common/roles";

export interface ClubMembershipModel {
    userId: number;
    clubId: number;
    joinedAt: string;
    role: ClubRole;
    status: MemberStatus;
}