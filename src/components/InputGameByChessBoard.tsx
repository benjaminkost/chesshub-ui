import {Box, Button, Grid} from "@mui/material";
import {SmartChessBoard} from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, {Key} from "react";
import {Api} from "@lichess-org/chessground/api";
import {Chess, DEFAULT_POSITION} from "chess.js";
import {MetaDataForGameInput} from "@/components/MetaDataForGameInput";
import {User} from "@/types/user";
import {_post} from "../../bff/clients/apiChessHubCoreClient";
import {useNavigate} from "react-router-dom";
import {Team} from "@/types/team";

interface MoveNode {
    notation: string;
    fen: string;
    comment?: string;
    nextMoves: MoveNode[];
}

export interface InputGameByChessBoardProps {
    allTeams: Team[];
    user: User;
}

export function InputGameByChessBoard({allTeams, user}:InputGameByChessBoardProps){
    const [chessApi, setChessApi] = React.useState<Api | null>(null);
    const [lastMove, setLastMove] = React.useState<Key[] | undefined>();
    const [currentPositionIndex, setCurrentPositionIndex] = React.useState<number>(0);
    const [moveList, setMoveList] = React.useState<string[]>([]);
    const [positions, setPositions] = React.useState<string[]>([DEFAULT_POSITION]);
    const [whitePlayer, setWhitePlayer] = React.useState<string>("");
    const [blackPlayer, setBlackPlayer] = React.useState<string>("");
    const [date, setDate] = React.useState<Date>();
    const [event, setEvent] = React.useState<string>("");
    const [round, setRound] = React.useState<number>();
    const [team, setTeam] = React.useState<Team>();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (moveList.length !== currentPositionIndex){
            setMoveList(moveList.splice(currentPositionIndex-1));
            setPositions(positions.splice(currentPositionIndex));
        }

        const chess = new Chess(positions.at(currentPositionIndex));
        try{
            const move = chess.move({from: lastMove[0], to: lastMove[1]});
            setMoveList([... moveList, move.san]);
            setCurrentPositionIndex(currentPositionIndex+1);
            setPositions([...positions, chess.fen()]);
        } catch(e){
            chessApi?.set({fen: chess.fen()});
        }
    },[lastMove]);

/*    React.useEffect(() => {
        if (positions.length-1 == currentPositionIndex){
            chessApi?.set({movable: {free: true}});
        } else {
            chessApi?.set({movable: {free: false}})
        }
        debugger
    },[currentPositionIndex]);*/

    const handleSaveGame = async () => {
        const payload = {
            "white_player_name": whitePlayer,
            "black_player_name": blackPlayer,
            "moves": moveList.toString(),
            "event": event,
            "date": date,
            "team": team
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
                            flexDirection: "row",
                            mb: 2
                        }}
                    >
                        <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{fen: positions[currentPositionIndex]}}/>
                        <MoveList moveList={moveList} setCurrentPositionIndex={setCurrentPositionIndex} currentPositionIndex={currentPositionIndex} />
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