import {Box, Button, Grid} from "@mui/material";
import {SmartChessBoard} from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, {Key} from "react";
import {Api} from "@lichess-org/chessground/api";
import {Chess, Move} from "chess.js";
import {MetaDataForGameInput} from "@/components/MetaDataForGameInput";
import {User} from "@/types/user";
import {_post} from "../../bff/clients/apiChessHubCoreClient";
import {useNavigate} from "react-router-dom";
import {Team} from "@/types/team";
import { v4 as uuidv4 } from "uuid";
import {allUsers} from "@/dummyData";
import {parsePgnToGameState} from"@/../bff/pgnParsing"
import {GameState, GameStateNode} from "@/types/game";

export interface ChessBoardEditorProps {
    allTeams: Team[];
    user: User;
    initialWhitePlayer?: User | string;
    initialBlackPlayer?: User | string;
    initialDate?: Date | undefined;
    initialEvent?: string;
    initialRound?: number;
    initialTeam?: Team | undefined;
    initialMoves?: string;
}

const defaultValues = {
    initialWhitePlayer: "",
    initialBlackPlayer: "",
    initialDate: undefined,
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
    const [whitePlayer, setWhitePlayer] = React.useState<User | string>(initialWhitePlayer);
    const [blackPlayer, setBlackPlayer] = React.useState<User | string>(initialBlackPlayer);
    const [date, setDate] = React.useState<Date | undefined>(initialDate);
    const [event, setEvent] = React.useState<string>(initialEvent);
    const [round, setRound] = React.useState<number | undefined>(initialRound);
    const [team, setTeam] = React.useState<Team | undefined>(initialTeam);
    const navigate = useNavigate();

    const convertTreeToPGNMoves = (): string => {
        return ""; // TODO: Define method
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