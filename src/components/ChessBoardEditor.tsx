import { Box, Button, Grid } from "@mui/material";
import { SmartChessBoard } from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, { Key, useState, useEffect } from "react";
import { Api } from "@lichess-org/chessground/api";
import { Chess, Move } from "chess.js";
import { MetaDataForGameInput } from "@/components/MetaDataForGameInput";
import { gamesApi } from "../../bff/src/clients/apiChesshubCore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";
import { produce } from "immer";
import { User } from "@benaurel/chesshub-core-client";
import { ROUTES } from "@/routes";
import { GameState, GameStateNode } from "@/types/models/game.model";
import { GameMetaData } from "@/types/viewmodels/game.vm";
import { TeamSimpleVm } from "@/types/viewmodels/team.vm";
import { parsePgnToGameState } from "../../bff/src/utils/pgnParsing";
import { mapGameVmToRequest } from "../../bff/src/mapper/mapper";
import {convertGameStateToPgn} from "../../bff/src/utils/interactWithGameState";

export interface ChessBoardEditorProps {
    allTeams: TeamSimpleVm[];
    user: User;
    initialWhitePlayer?: string;
    initialBlackPlayer?: string;
    initialDate?: Dayjs | null;
    initialEvent?: string;
    initialRound?: number;
    initialTeam?: TeamSimpleVm | undefined;
    initialMoves?: string;
}

export function ChessBoardEditor({ 
    allTeams,
    user,
    initialWhitePlayer = "",
    initialBlackPlayer = "",
    initialDate = null,
    initialEvent = "",
    initialRound = undefined,
    initialTeam = undefined,
    initialMoves = ""
}: ChessBoardEditorProps) {
    const navigate = useNavigate();
    
    const [chessApi, setChessApi] = useState<Api | null>(null);
    const [lastMove, setLastMove] = useState<Key[] | undefined>();
    const [gameState, setGameState] = useState<GameState>(parsePgnToGameState(initialMoves));

    const [metaData, setMetaData] = useState<GameMetaData>({
        whitePlayerName: initialWhitePlayer,
        blackPlayerName: initialBlackPlayer,
        date: initialDate || dayjs(),
        event: initialEvent,
        round: initialRound,
        teamId: initialTeam?.id,
        teamName: initialTeam?.name
    });

    const handleMetaChange = (update: Partial<GameMetaData>) => {
        setMetaData(prev => ({ ...prev, ...update }));
    };

    useEffect(() => {
        if (!lastMove) return;
        const currentFen = gameState.allGameStates[gameState.activeStateId].fen;
        const chess = new Chess(currentFen);
        try {
            const move: Move = chess.move({ 
                from: lastMove[0].toString(), 
                to: lastMove[1].toString(),
                promotion: 'q'
            });
            chessApi?.set({ fen: chess.fen() });
            const parentId = gameState.activeStateId;
            setGameState(prev => {
                const parentState = prev.allGameStates[parentId];
                const existingMoveId = parentState.nextMoves.find(id => prev.allGameStates[id].notation === move.san);
                if (existingMoveId) return { ...prev, activeStateId: existingMoveId };
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
                        [parentId]: { ...prev.allGameStates[parentId], nextMoves: [...prev.allGameStates[parentId].nextMoves, newStateId] },
                        [newStateId]: newState
                    }
                }
            });
        } catch (e) {
            chessApi?.set({ fen: currentFen });
        }
    }, [lastMove]);

    useEffect(() => {
        chessApi?.set({ fen: gameState.allGameStates[gameState.activeStateId].fen });
    }, [gameState.activeStateId, chessApi]);

    const handleSaveGame = async () => {
        const gameRequest = mapGameVmToRequest(metaData, convertGameStateToPgn(gameState));

        try {
            await gamesApi.createGame(gameRequest);
            navigate(ROUTES.GAMES.LIST_USER.func(user.id!));
        } catch (error) {
            console.error("Failed to save game:", error);
            alert("Fehler beim Speichern der Partie.");
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
            <Grid container>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                        <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{ fen: gameState.allGameStates[gameState.activeStateId].fen }} />
                        <MoveList 
                            gameState={gameState} 
                            onMoveSelect={(id) => setGameState(prev => ({ ...prev, activeStateId: id }))} 
                            setEvaluation={(id, evalVal) => {
                                setGameState(produce((prev: GameState) => {
                                    const node = prev.allGameStates[id];
                                    if (node) {
                                        if (!node.analysis) node.analysis = { recommendedMoves: [], depth: 0, eval: { centiPawn: 0, isMate: false, mateIn: 0 } };
                                        node.analysis.eval.centiPawn = evalVal ?? 0;
                                    }
                                }));
                            }} 
                        />
                    </Box>
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <MetaDataForGameInput
                        allTeams={allTeams}
                        gameMetaData={metaData}
                        onChangeGameMetaData={handleMetaChange}
                    />
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <Button fullWidth onClick={handleSaveGame} sx={{ width: 600, mt: 2, backgroundColor: "gray", color: "white" }}>
                        Partie speichern
                    </Button>
                </Grid>
                <Grid size={2}></Grid>
            </Grid>
        </Box>
    );
}