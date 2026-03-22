import {Club} from "./club.js";
import {Member, User} from "@/types/user";

export interface Team {
    id: number;
    club: Club;
    name: string;
    members: Member[];
    admin: User;
}