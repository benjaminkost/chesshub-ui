import {AppRole} from "@/types/common/roles";

export interface UserModel {
    id: number;
    name: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    appRole: AppRole;
    fideId?: string;
    lichessUsername?: string;
    chesscomUsername?: string;
    clubIds?: number[];
    teamIds?: number[];
}