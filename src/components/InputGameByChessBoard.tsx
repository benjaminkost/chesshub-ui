import {Box} from "@mui/material";
import {SmartChessBoard} from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React, {Key} from "react";
import {Api} from "@lichess-org/chessground/api";
import {Chess, DEFAULT_POSITION} from "chess.js";

export function InputGameByChessBoard(){
    const [moveIndex, setMoveIndex] = React.useState<number>(0);
    const [chessApi, setChessApi] = React.useState<Api | null>(null);
    const [lastMove, setLastMove] = React.useState<Key[] | undefined>();
    const [moveList, setMoveList] = React.useState<string[]>([]);
    const [positions, setPositions] = React.useState<string[]>([DEFAULT_POSITION]);

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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                m: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                }}
            >
                <SmartChessBoard setChessApi={setChessApi} setLastMove={setLastMove} config={{fen: positions[moveIndex+1]}}/>
                <MoveList pgnMoves={moveList} setMoveIndex={setMoveIndex} moveIndex={moveIndex} />
            </Box>
        </Box>
    )
}