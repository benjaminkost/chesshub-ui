import {Box, Button, Grid} from "@mui/material";
import {SmartChessBoard} from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, {Key} from "react";
import {Api} from "@lichess-org/chessground/api";
import {Chess, Move} from "chess.js";
import {MetaDataForGameInput} from "@/components/MetaDataForGameInput";
import {UserModel} from "@/types/models/user.model";
import {_post} from "../../bff/src/clients/apiChessHubCoreClient";
import {useNavigate} from "react-router-dom";
import {TeamModel} from "@/types/models/team.model";
import { v4 as uuidv4 } from "uuid";
import {allUsers} from "@/dummyData";
import {parsePgnToGameState} from "../../bff/src/pgnParsing"
import {GameState, GameStateNode} from "@/types/models/game.model";
import {Dayjs} from "dayjs";
import {produce} from "immer";
import {GameWithTeamVm} from "@/types/viewmodels/game.vm";

export interface ChessBoardEditorProps {
    allTeams: TeamModel[];
    user: UserModel;
    game: GameWithTeamVm;
}

export function ChessBoardEditor({allTeams,
                                     user,
                                     game
                                 }:ChessBoardEditorProps){
    const [chessApi, setChessApi] = React.useState<Api | null>(null);
    const [lastMove, setLastMove] = React.useState<Key[] | undefined>();
    const [gameState, setGameState] = React.useState<GameState>(parsePgnToGameState(game.moves));
    const [whitePlayer, setWhitePlayer] = React.useState<UserModel | string | undefined>(game?.whitePlayerName);
    const [blackPlayer, setBlackPlayer] = React.useState<UserModel | string | undefined>(game?.blackPlayerName);
    const [date, setDate] = React.useState<Dayjs | null | undefined>(game?.date);
    const [event, setEvent] = React.useState<string | undefined>(game?.event);
    const [round, setRound] = React.useState<number | undefined>(game?.round);
    const [team, setTeam] = React.useState<TeamModel | undefined>(allTeams.find( team => team.id === game?.teamId));
    const navigate = useNavigate();

    const convertTreeToPGNMoves = (): string => {
        return ""; // TODO: Define method
    };

    React.useEffect(() => {
        const chess = new Chess(gameState.allGameStates[gameState.activeStateId].fen);
        try {
            if (lastMove?.length !== 2) throw Error("Move given from chessboard is no completet move");
            const move:Move = chess.move({from: lastMove[0].toString(), to: lastMove[1].toString()});
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
            "date": date?.toISOString(),
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

    const handleEvaluationChange = (id:string, evaluation: number | null) => {
        setGameState(produce((prev:GameState) => {
            const node = prev.allGameStates[id];
            if (!node) return prev;

            if (!node.analysis) {
                node.analysis = {
                    recommendedMoves: [],
                    depth: 0,
                    eval: { centiPawn: 0, isMate: false, mateIn: 0}
                }
            }

            node.analysis.eval.centiPawn = evaluation ?? 0;
        }))
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
                        <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{fen: gameState.allGameStates[gameState.activeStateId].fen}}/>
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
                        allUsers={allUsers}
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