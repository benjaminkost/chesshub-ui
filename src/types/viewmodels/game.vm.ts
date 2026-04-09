import {Dayjs} from "dayjs";
import {StrictOmit} from "@/types/common/utils";

export interface GameVm {
    id: number;
    whitePlayerId?: number;
    blackPlayerId?: number;
    whitePlayerName?: string;
    blackPlayerName?: string;
    date?: Dayjs | null;
    opening?: string;
    event?: string;
    site?: string;
    board?: string;
    result?: string;
    round?: number;
    moves: string;
}

export type GameSimpleVm  = Pick<GameVm, "id" | "whitePlayerName" | "blackPlayerName" | "date" | "opening" | "event" | "result" | "moves">;

export interface GameWithTeamVm extends GameVm{
    teamId?: number;
    teamName?: string;
}

export type GameMetaData = StrictOmit<GameWithTeamVm, "id" | "moves">;