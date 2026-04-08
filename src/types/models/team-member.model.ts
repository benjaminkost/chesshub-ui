import {TeamRole} from "@/types/common/roles";

export interface TeamMemberModel {
    userId: number;
    teamId: number;
    joinedAt: string;
    role: TeamRole[];
}