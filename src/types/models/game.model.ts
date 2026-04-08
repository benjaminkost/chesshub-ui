import {TeamModel} from "@/types/models/team.model";
import {Dayjs} from "dayjs";

export interface GameModel {
    id: number,
    whiteId: number,
    whitePlayerName?: string,
    blackId: number,
    blackPlayerName?: string,
    date: Dayjs,
    opening?: string,
    event?: string,
    site?: string
    board?: string,
    result?: string
    moves: string
}

export interface GameSetting extends GameModel{
    team: TeamModel;
}

export const defaultStartValue = "START";

export interface Evaluation {
    centiPawn: number | null;
    isMate: boolean;
    mateIn?: number;
}

export interface Recommendation {
    notation: string;
    eval: Evaluation;
    engineDepth: number;
}

export interface EngineAnalysis {
    recommendedMoves?: Recommendation[];
    depth?: number;
    eval: Evaluation;
}

export interface GameStateNode {
    id: string;
    parentId: string | null;
    moveNumber: number;
    notation: string;
    fen: string;
    color: "w" | "b";
    nextMoves: string[];
    comment?: string;
    analysis?: EngineAnalysis;
}

export interface GameState {
    activeStateId: string;
    rootId: string;
    allGameStates: Record<string, GameStateNode>,
}