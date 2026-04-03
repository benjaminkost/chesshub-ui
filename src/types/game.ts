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
export const defaultStartValue = "START";

export interface Evaluation {
    centiPawn: number;
    isMate: boolean;
    mateIn?: number;
}

export interface Recommendation {
    notation: string;
    eval: Evaluation;
    engineDepth: number;
}

export interface EngineAnalysis {
    recommendedMoves: Recommendation[];
    depth: number;
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