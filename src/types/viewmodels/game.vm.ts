import {Dayjs} from "dayjs";

export interface GameVm {
    id: number;
    whitePlayerName?: string;
    blackPlayerName?: string;
    date?: Dayjs,
    opening?: string,
    event?: string,
    site?: string
    board?: string,
    result?: string,
    round?: number,
    moves: string
}

export interface GameWithTeamVm {
    id: number;
    whitePlayerName?: string;
    blackPlayerName?: string;
    date?: Dayjs,
    opening?: string,
    event?: string,
    site?: string
    board?: string,
    result?: string
    round?: number,
    teamId?: number,
    teamName?: string,
    moves: string
}