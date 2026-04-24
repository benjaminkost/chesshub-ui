import { ClubRole } from "@/types/common/roles";
import { ClubMemberStatus } from "@benaurel/chesshub-core-client";

export interface ClubMembershipModel {
    userId: number;
    clubId: number;
    joinedAt: string;
    role: ClubRole[];
    status: ClubMemberStatus;
}