import { Box, Button, Grid } from "@mui/material";
import { SmartChessBoard } from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, { Key } from "react";
import { Api } from "@lichess-org/chessground/api";
import { Chess, Move } from "chess.js";
import { MetaDataForGameInput } from "@/components/MetaDataForGameInput";
import { _post } from "../../bff/src/clients/apiChessHubCoreClient";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { parsePgnToGameState } from "../../bff/src/utils/pgnParsing"
import { GameState, GameStateNode } from "@/types/models/game.model";
import { produce } from "immer";
import { GameMetaData, GameWithTeamVm } from "@/types/viewmodels/game.vm";
import { mapGameWithTeamVmToGameMetaData } from "../../bff/src/mapper/game.mapper";
import { TeamSimpleVm } from "@/types/viewmodels/team.vm";
import {ROUTES} from "@/routes";
import {useAuth} from "@/context/AuthContext";
import {convertGameStateToPgn} from "../../bff/src/utils/interactWithGameState";

export interface ChessBoardEditorProps {
    allTeams: TeamSimpleVm[];
    game: GameWithTeamVm;
}

export function ChessBoardEditor({ allTeams, game }: ChessBoardEditorProps) {
    const [chessApi, setChessApi] = React.useState<Api | null>(null);
    const [lastMove, setLastMove] = React.useState<Key[] | undefined>();
    const [gameState, setGameState] = React.useState<GameState>(parsePgnToGameState(game.moves));
    const [gameMetaData, setGameMetaData] = React.useState<GameMetaData>(mapGameWithTeamVmToGameMetaData(game));
    const { user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        const chess = new Chess(gameState.allGameStates[gameState.activeStateId].fen);
        try {
            if (lastMove?.length !== 2) throw Error("Move given from chessboard is no completet move");
            const move: Move = chess.move({ from: lastMove[0].toString(), to: lastMove[1].toString() });
            chessApi?.set({ fen: chess.fen() });
            const parentId = gameState.activeStateId;

            setGameState(prev => {
                const parentState = prev.allGameStates[parentId];

                const existingMoveId = parentState.nextMoves.find(id => (
                    prev.allGameStates[id].notation === move.san
                ));

                if (existingMoveId) {
                    return { ...prev, activeStateId: existingMoveId };
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
        } catch (e) {
            chessApi?.set({ fen: chess.fen() });
        }
    }, [lastMove]);

    React.useEffect(() => {
        chessApi?.set({ fen: gameState.allGameStates[gameState.activeStateId].fen });
    }, [gameState.activeStateId]);

    const handleSaveGame = async () => {
        const payload = {
            "white_player_name": gameMetaData.whitePlayerName,
            "black_player_name": gameMetaData.blackPlayerName,
            "moves": convertGameStateToPgn(gameState),
            "event": gameMetaData.event,
            "date": gameMetaData.date?.toISOString(),
            "team": gameMetaData.teamId
        };
        await _post("", payload);

        if (!user){
            navigate(ROUTES.AUTH.LOGIN.func());
            return;
        }
        navigate(ROUTES.GAMES.LIST_USER.func(user.id));
    }

    const handleMoveSelect = (id: string) => {
        setGameState(prev => ({
            ...prev,
            activeStateId: id
        }));
    };

    const handleEvaluationChange = (id: string, evaluation: number | null) => {
        setGameState(produce((prev: GameState) => {
            const node = prev.allGameStates[id];
            if (!node) return prev;

            if (!node.analysis) {
                node.analysis = {
                    recommendedMoves: [],
                    depth: 0,
                    eval: { centiPawn: 0, isMate: false, mateIn: 0 }
                }
            }

            node.analysis.eval.centiPawn = evaluation ?? 0;
        }))
    }

    const onChangeGameMetaData = (update: Partial<GameMetaData>) => {
        setGameMetaData(prev => ({ ...prev, ...update }));
    }

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
                        <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{ fen: gameState.allGameStates[gameState.activeStateId].fen }} />
                        <MoveList
                            gameState={gameState}
                            onMoveSelect={handleMoveSelect}
                            setEvaluation={handleEvaluationChange}
                        />
                    </Box>
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <MetaDataForGameInput
                        allTeams={allTeams}
                        gameMetaData={gameMetaData}
                        onChangeGameMetaData={onChangeGameMetaData}
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