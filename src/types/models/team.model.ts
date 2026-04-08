import {ClubModel} from "./club.model";
import {UserModel} from "@/types/models/user.model";

export interface TeamModel {
    id: number;
    club: ClubModel;
    name: string;
    members?: UserModel[];
    admin?: UserModel;
}