import {Team} from "@/types/team";

export interface Game {
    id: number,
    whites: string,
    blacks: string,
    dates: Date,
    event?: string,
    board?: string,
    moves: string
}

export interface GameSetting {
    game: Game;
    team: Team;
}