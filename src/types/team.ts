import {Club} from "./club.js";

export enum MemberRole{
    ADMIN="Admin",
    CAPTAIN="Kapitän",
    HEAD_COACH="Trainer",
    PLAYER="Spieler",
    RESERVE="Ersatzspieler"
}

export interface Member{
    id: number;
    name: string;
    roles: MemberRole[];
}

export interface Team {
    id: number;
    club: Club;
    name: string;
    members: Member[];
}