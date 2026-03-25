import {Team} from "@/types/team";

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

export interface User{
    id: number;
    name: string;
    userName: string;
    email: string;
    team?: Team;
}