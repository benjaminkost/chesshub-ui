import {Dayjs} from "dayjs";
import {StrictOmit} from "@/types/common/utils";
import {TeamSimpleVm} from "@/types/viewmodels/team.vm";

export interface GameVm {
    id: number;
    whitePlayerId?:number
    whitePlayerName?: string;
    blackPlayerId?: number;
    blackPlayerName?: string;
    date?: Dayjs | null;
    opening?: string;
    event?: string;
    site?: string;
    board?: string;
    result?: string;
    round?: number;
    team?: TeamSimpleVm;
    moves: string;
}

export type GameSimpleVm  = Pick<GameVm, "id" | "whitePlayerId" | "whitePlayerName" | "blackPlayerId" | "blackPlayerName" | "date" | "opening" | "event" | "result" | "moves">;

export interface GameWithTeamVm extends GameVm{
    teamId?: number;
    teamName?: string;
}

export type GameMetaData = StrictOmit<GameWithTeamVm, "id" | "moves">;