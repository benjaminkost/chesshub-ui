import {Box, Button, Grid} from "@mui/material";
import {SmartChessBoard} from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, {Key} from "react";
import {Api} from "@lichess-org/chessground/api";
import {Chess, Move} from "chess.js";
import {MetaDataForGameInput} from "@/components/MetaDataForGameInput";
import {gamesApi} from "@/api/chesshub";
import {useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {Dayjs} from "dayjs";
import {produce} from "immer";
import { Team, User, GameRequest } from "@benaurel/chesshub-core-client";
import { ROUTES } from "@/routes";

export interface ChessBoardEditorProps {
    allTeams: Team[];
    user: User;
    initialWhitePlayer?: string;
    initialBlackPlayer?: string;
    initialDate?: Dayjs | null;
    initialEvent?: string;
    initialRound?: number;
    initialTeam?: Team | undefined;
    initialMoves?: string;
}

const defaultValues = {
    initialWhitePlayer: "",
    initialBlackPlayer: "",
    initialDate: null,
    initialEvent: "",
    initialRound: undefined,
    initialTeam: undefined,
    initialMoves: "",
}

export function ChessBoardEditor({allTeams,
                                     user,
                                     initialWhitePlayer=defaultValues.initialWhitePlayer,
                                     initialBlackPlayer=defaultValues.initialBlackPlayer,
                                     initialDate=defaultValues.initialDate,
                                     initialEvent=defaultValues.initialEvent,
                                     initialRound=defaultValues.initialRound,
                                     initialTeam=defaultValues.initialTeam,
                                     initialMoves=defaultValues.initialMoves
                                 }:ChessBoardEditorProps){
    const [chessApi, setChessApi] = React.useState<Api | null>(null);
    const [lastMove, setLastMove] = React.useState<Key[] | undefined>();
    const [gameState, setGameState] = React.useState<GameState>(parsePgnToGameState(initialMoves));
    const [whitePlayer, setWhitePlayer] = React.useState<string>(initialWhitePlayer);
    const [blackPlayer, setBlackPlayer] = React.useState<string>(initialBlackPlayer);
    const [date, setDate] = React.useState<Dayjs | null>(initialDate);
    const [event, setEvent] = React.useState<string>(initialEvent);
    const [round, setRound] = React.useState<number | undefined>(initialRound);
    const [team, setTeam] = React.useState<Team | undefined>(initialTeam);
    const navigate = useNavigate();

    const convertTreeToPGNMoves = (): string => initialMoves || "";

    React.useEffect(() => {
        if (!lastMove) return;
        const chess = new Chess(gameState.allGameStates[gameState.activeStateId].fen);
        try {
            const move:Move = chess.move({from: lastMove[0].toString(), to: lastMove[1].toString()});
            chessApi?.set({fen: chess.fen()});
            const parentId = gameState.activeStateId;

            setGameState(prev => {
                const parentState = prev.allGameStates[parentId];
                const existingMoveId = parentState.nextMoves.find(id => prev.allGameStates[id].notation === move.san);

                if (existingMoveId) return {...prev, activeStateId: existingMoveId};

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
        } catch(e){
            chessApi?.set({fen: chess.fen()});
        }
    }, [lastMove]);

    React.useEffect(() => {
        chessApi?.set({fen: gameState.allGameStates[gameState.activeStateId].fen});
    }, [gameState.activeStateId, chessApi]);

    const handleSaveGame = async () => {
        const gameRequest: GameRequest = {
            whitePlayerName: whitePlayer,
            blackPlayerName: blackPlayer,
            moves: convertTreeToPGNMoves(),
            event: event,
            date: date ? date.format("YYYY-MM-DD") : undefined,
            teamId: team?.id
        };
        
        try {
            await gamesApi.createGame(gameRequest);
            navigate(ROUTES.GAMES.LIST_USER.func(user.id!));
        } catch (error) {
            console.error("Failed to save game:", error);
            alert("Fehler beim Speichern der Partie.");
        }
    }

    const handleMoveSelect = (id: string) => {
        setGameState(prev => ({ ...prev, activeStateId: id }));
    };

    const handleEvaluationChange = (id:string, evaluation: number | null) => {
        setGameState(produce((prev:GameState) => {
            const node = prev.allGameStates[id];
            if (!node) return prev;
            if (!node.analysis) node.analysis = { recommendedMoves: [], depth: 0, eval: { centiPawn: 0, isMate: false, mateIn: 0} };
            node.analysis.eval.centiPawn = evaluation ?? 0;
        }))
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
            <Grid container>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                        <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{fen: gameState.allGameStates[gameState.activeStateId].fen}}/>
                        <MoveList gameState={gameState} onMoveSelect={handleMoveSelect} setEvaluation={handleEvaluationChange} />
                    </Box>
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <MetaDataForGameInput
                        allUsers={[]}
                        whitePlayerData={whitePlayer}
                        setWhitePlayer={setWhitePlayer as any}
                        blackPlayerData={blackPlayer}
                        setBlackPlayer={setBlackPlayer as any}
                        dateData={date}
                        setDate={setDate}
                        eventData={event}
                        setEvent={setEvent}
                        roundData={round}
                        setRound={setRound}
                        team={team as any}
                        setTeam={setTeam as any}
                        allTeams={allTeams as any}
                        user={user as any}
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
    )
}