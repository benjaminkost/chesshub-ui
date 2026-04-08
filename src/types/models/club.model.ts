import {UserModel} from "@/types/models/user.model";

export interface ClubModel {
    id: number;
    name: string;
    address?: string;
    admin?: UserModel;
}

