import { Box } from "@mui/material";
import ChessBoard from "./ChessBoard";
import MoveList from "./MoveList";
import {pgnStringToMoveList} from "@/../bff/pgnStringToMoveList";
import React from "react";
import {Chess} from "chess.js";

interface GameAnalyzerProps {
    pgn: string
}

export default function GameAnalyzer({pgn}: GameAnalyzerProps) {
    const pgnMoves = pgnStringToMoveList(pgn);
    const [moveIndex, setMoveIndex] = React.useState(0);

    const allFens = React.useMemo(() => {
        const chess = new Chess();

        chess.loadPgn(pgn);
        const history = chess.history();

        const tempGame = new Chess();
        let fens:string[] = [tempGame.fen()];

        for(const move of history){
            tempGame.move(move);
            fens.push(tempGame.fen());
        }

        return fens;
    }, [pgn]);

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            m: 2
        }}>
            <ChessBoard config={{fen: allFens[moveIndex], movable: {free: false}}}/>
            <MoveList moveList={pgnMoves}
                      setCurrentPositionIndex={setMoveIndex}
                      currentPositionIndex={moveIndex}
            />
        </Box>
    );
}
