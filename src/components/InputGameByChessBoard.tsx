import {Box, Button, Grid} from "@mui/material";
import {SmartChessBoard} from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, {Key} from "react";
import {Api} from "@lichess-org/chessground/api";
import {Chess, DEFAULT_POSITION} from "chess.js";
import {MetaDataForGameInput} from "@/components/MetaDataForGameInput";
import {User} from "@/types/user";
import {Club} from "@/types/club";
import {_post} from "../../bff/clients/apiChessHubCoreClient";
import {useNavigate} from "react-router-dom";

interface InputGameByChessBoardProps {
    allClubs: Club[];
    user: User;
}

export function InputGameByChessBoard({allClubs, user}:InputGameByChessBoardProps){
    const [moveIndex, setMoveIndex] = React.useState<number>(0);
    const [chessApi, setChessApi] = React.useState<Api | null>(null);
    const [lastMove, setLastMove] = React.useState<Key[] | undefined>();
    const [moveList, setMoveList] = React.useState<string[]>([]);
    const [positions, setPositions] = React.useState<string[]>([DEFAULT_POSITION]);
    const [whitePlayer, setWhitePlayer] = React.useState<string>("");
    const [blackPlayer, setBlackPlayer] = React.useState<string>("");
    const [date, setDate] = React.useState<Date>();
    const [event, setEvent] = React.useState<string>("");
    const [round, setRound] = React.useState<number>();
    const [club, setClub] = React.useState<Club>();
    const navigate = useNavigate();

    React.useEffect(() => {
        const chess = new Chess(positions.at(moveIndex));
        try{
            const move = chess.move({from: lastMove[0], to: lastMove[1]});
            setMoveList([... moveList, move.san]);
            setMoveIndex(moveIndex+1);
            setPositions([...positions, chess.fen()]);
        } catch(e){
            chessApi?.set({fen: chess.fen()});
        }
    },[lastMove]);

    const handleSaveGame = async () => {
        const payload = {
            "white_player_name": whitePlayer,
            "black_player_name": blackPlayer,
            "moves": moveList.toString(),
            "event": event,
            "date": date,
            "club": club
        };
        await _post("", payload);
        navigate("/ownGamesHistory");
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
                            flexDirection: "row"
                        }}
                    >
                        <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{fen: positions[moveIndex+1]}}/>
                        <MoveList pgnMoves={moveList} setMoveIndex={setMoveIndex} moveIndex={moveIndex} />
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
                        club={club}
                        setClub={setClub}
                        allClubs={allClubs}
                        user={user}
                    />
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={8}>
                    <Button onClick={handleSaveGame}>Partie speichern</Button>
                </Grid>
                <Grid size={2}></Grid>
            </Grid>
        </Box>
    )
}