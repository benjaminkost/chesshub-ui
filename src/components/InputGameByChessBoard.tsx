import {Box, Button, Grid} from "@mui/material";
import {SmartChessBoard} from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, {Key} from "react";
import {Api} from "@lichess-org/chessground/api";
import {Chess, DEFAULT_POSITION, Move} from "chess.js";
import {MetaDataForGameInput} from "@/components/MetaDataForGameInput";
import {User} from "@/types/user";
import {_post} from "../../bff/clients/apiChessHubCoreClient";
import {useNavigate} from "react-router-dom";
import {Team} from "@/types/team";
import { v4 as uuidv4 } from "uuid";

interface Evaluation {
    centiPawn: number;
    isMate: boolean;
    mateIn?: number;
}

interface Recommendation {
    notation: string;
    eval: Evaluation;
    engineDepth: number;
}

interface EngineAnalysis {
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


export interface InputGameByChessBoardProps {
    allTeams: Team[];
    user: User;
}

export function InputGameByChessBoard({allTeams, user}:InputGameByChessBoardProps){
    const ROOT_ID = "root";
    
    const startingRecordGameState: Record<string,GameStateNode> = {
        [ROOT_ID]: {
            id: ROOT_ID,
            parentId: null,
            moveNumber: 0,
            notation: "START",
            fen: DEFAULT_POSITION,
            color: "b",
            nextMoves: []
        }
    };

    const startingGameState:GameState = {
        activeStateId: ROOT_ID,
        rootId: ROOT_ID,
        allGameStates: startingRecordGameState
    };

    const [chessApi, setChessApi] = React.useState<Api | null>(null);
    const [lastMove, setLastMove] = React.useState<Key[] | undefined>();
    const [gameState, setGameState] = React.useState<GameState>(startingGameState);
    const [whitePlayer, setWhitePlayer] = React.useState<string>("");
    const [blackPlayer, setBlackPlayer] = React.useState<string>("");
    const [date, setDate] = React.useState<Date>();
    const [event, setEvent] = React.useState<string>("");
    const [round, setRound] = React.useState<number>();
    const [team, setTeam] = React.useState<Team>();
    const navigate = useNavigate();

    const convertTreeToPGNMoves = (): string => {
        return "";
    };

    React.useEffect(() => {
        const chess = new Chess(gameState.allGameStates[gameState.activeStateId].fen);
        try {
            const move:Move = chess.move({from: lastMove[0], to: lastMove[1]});
            chessApi?.set({fen: chess.fen()});
            const parentId = gameState.activeStateId;

            setGameState(prev => {
                const parentState = prev.allGameStates[parentId];

                const existingMoveId = parentState.nextMoves.find(id => (
                    prev.allGameStates[id].notation === move.san
                ));

                if (existingMoveId) {
                    return {...prev, activeStateId: existingMoveId};
                }

                const newStateId = uuidv4();
                const newState: GameStateNode = {
                    id: newStateId,
                    parentId: parentId,
                    fen: chess.fen(),
                    notation: move.san,
                    color: parentState.color === "w" ? "b" : "w",
                    moveNumber: parentState.color === "w" ? parentState.moveNumber : parentState.moveNumber + 1,
                    nextMoves: []
                };

                return {
                    ...prev,
                    activeStateId: newStateId,
                    allGameStates: {
                        ...prev.allGameStates,
                        [parentId]: {
                            ...prev.allGameStates[parentId],
                            nextMoves: [...prev.allGameStates[parentId].nextMoves, newStateId]
                        },
                        [newStateId]: newState
                    }
                }
            });
        } catch(e){
            chessApi?.set({fen: chess.fen()});
        }
    },[lastMove]);

    React.useEffect(() => {
        chessApi?.set({fen: gameState.allGameStates[gameState.activeStateId].fen});
    },[gameState.activeStateId]);

    const handleSaveGame = async () => {
        const payload = {
            "white_player_name": whitePlayer,
            "black_player_name": blackPlayer,
            "moves": convertTreeToPGNMoves(),
            "event": event,
            "date": date,
            "team": team
        };
        await _post("", payload);
        navigate("/own-games-history");
    }

    const handleMoveSelect = (id: string) => {
        setGameState(prev => ({
            ...prev,
            activeStateId: id
        }));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                m: 2
            }}
        >
            <Grid container>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: 2
                        }}
                    >
                        <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{fen: gameState.allGameStates[gameState.activeStateId].fen}}/>
                        <MoveList gameState={gameState} onMoveSelect={handleMoveSelect}/>
                    </Box>
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <MetaDataForGameInput
                        whitePlayerData={whitePlayer}
                        setWhitePlayer={setWhitePlayer}
                        blackPlayerData={blackPlayer}
                        setBlackPlayer={setBlackPlayer}
                        dateData={date}
                        setDate={setDate}
                        eventData={event}
                        setEvent={setEvent}
                        roundData={round}
                        setRound={setRound}
                        team={team}
                        setTeam={setTeam}
                        allTeams={allTeams}
                        user={user}
                    />
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <Button fullWidth onClick={handleSaveGame} sx={{
                        width: 600,
                        mt: 2,
                        backgroundColor: "gray",
                        color: "white"
                    }}
                    >Partie speichern</Button>
                </Grid>
                <Grid size={2}></Grid>
            </Grid>
        </Box>
    )
}