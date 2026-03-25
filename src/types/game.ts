import {Team} from "@/types/team";

export interface Game {
    id: number,
    whites: string,
    blacks: string,
    dates: Date,
    opening?: string,
    event?: string,
    board?: string,
    moves: string
}

export interface GameSetting extends Game{
    team: Team;
}