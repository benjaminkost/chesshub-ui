import {TeamModel} from "@/types/models/team.model";
import {ClubModel} from "@/types/models/club.model";
import {AppRole} from "@/types/common/roles";

export interface UserModel {
    id: number;
    name: string;
    userName: string;
    email: string;
    phoneNumber: string;
    appRole: AppRole;
    fideID?: string;
    lichessUsername?: string;
    chesscomUsername?: string;
    club?: ClubModel;
    team?: TeamModel;
}