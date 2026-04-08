import {Dayjs} from "dayjs";
import { TeamVm } from "./team.vm";

export interface GameVm {
    id: number;
    whitePlayerId?: number;
    blackPlayerId?: number;
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

export interface GameSimpleVm {
    id: number;
    whitePlayerName?: string;
    blackPlayerName?: string;
    date?: Dayjs,
    opening?: string,
    event?: string,
    result?: string,
    moves: string
}

export interface GameWithTeamVm {
    id: number;
    whitePlayerId?: number;
    whitePlayerName?: string;
    blackPlayerId?: number;
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

export interface GameMetaData {
    whitePlayerId?: number;
    whitePlayerName?: string | undefined;
    blackPlayerId?: number;
    blackPlayerName?: string | undefined;
    date?: Dayjs | null | undefined;
    event?: string | undefined;
    round?: number | undefined;
    teamId?: number;
    teamName?: string;
}