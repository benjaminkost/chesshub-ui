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
import {allUsers} from "@/dummyData";

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

export const defaultStartValue = "START";

const parsePgnToGameState= (pgn: string):GameState =>  { // TODO: written bei Gemini -> needs review
    const chess = new Chess();
    const rootId = defaultStartValue;

    // Initialer State mit Startaufstellung
    const allGameStates: Record<string, GameStateNode> = {
        [rootId]: {
            id: rootId,
            parentId: null,
            moveNumber: 1,
            notation: defaultStartValue,
            fen: DEFAULT_POSITION,
            color: "w",
            nextMoves: []
        }
    };

    let activeId = rootId;
    // Der Stack speichert die ID, zu der wir nach einer geschlossenen Klammer zurückkehren
    const parentStack: string[] = [];

    // Wir extrahieren Züge, Kommentare und Klammern.
    // RegEx: Züge (e4), Klammern (), oder Kommentare {}
    const tokens = pgn.match(/\(|\)|\d+\.+|[a-zA-Z0-9+#=/-]+|\{[^}]*\}/g) || [];

    tokens.forEach(token => {
        if (token === "(") {
            // Variante startet: Wir speichern den Vater des aktuellen Zuges auf dem Stack
            const currentNode = allGameStates[activeId];
            if (currentNode.parentId) {
                parentStack.push(currentNode.parentId);
            }
        } else if (token === ")") {
            // Variante endet: Wir springen zurück zum letzten gespeicherten Vater
            const lastParent = parentStack.pop();
            if (lastParent) activeId = lastParent;
        } else if (token.startsWith("{") || /^\d+\.+$/.test(token)) {
            // Kommentare oder Zugnummern (1., 1...) ignorieren wir für die Logik
            return;
        } else {
            // Es ist ein echter Zug (z.B. "e4" oder "Nf3")
            try {
                const currentFen = allGameStates[activeId].fen;
                chess.load(currentFen);

                const move = chess.move(token);
                if (move) {
                    const newStateId = uuidv4();
                    const parentNode = allGameStates[activeId];

                    // Neuen Knoten erstellen
                    const newNode: GameStateNode = {
                        id: newStateId,
                        parentId: activeId,
                        notation: move.san,
                        fen: chess.fen(),
                        color: move.color === "w" ? "b" : "w",
                        moveNumber: move.color === "w" ? parentNode.moveNumber : parentNode.moveNumber + 1,
                        nextMoves: []
                    };

                    // In Map speichern
                    allGameStates[newStateId] = newNode;
                    // Verknüpfung beim Vater eintragen
                    allGameStates[activeId].nextMoves.push(newStateId);

                    // Der neue Zug ist nun der aktive Pointer
                    activeId = newStateId;
                }
            } catch (e) {
                console.error("Ungültiger Zug im PGN:", token);
            }
        }
    });

    return {
        rootId,
        activeStateId: activeId, // Pointer steht am Ende der Hauptlinie
        allGameStates
    };
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