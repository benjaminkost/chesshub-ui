import {Club} from "./club.js";
import {Member} from "@/types/user";

export interface Team {
    id: number;
    club: Club;
    name: string;
    members: Member[];
    admin: Member;
}