import {Dayjs} from "dayjs";

export interface GameVm {
    id: number;
    whitePlayerName?: string;
    blackPlayerName?: string;
    date?: Dayjs,
    opening?: string,
    teamName: string,
    move: string
}