import { Box } from "@mui/material";
import ChessBoard from "./ChessBoard.js";
import MoveList from "./MoveList.js";
import {pgnStringToMoveList} from "../../bff/pgnStringToMoveList.js";
import React from "react";
import {Chess} from "chess.js";

interface GameAnalyzerProps {
    pgn: string
}

export default function GameAnalyzer({pgn}: GameAnalyzerProps) {
    const pgnMoves = pgnStringToMoveList(pgn);
    const [moveIndex, setMoveIndex] = React.useState(0);

    const handleMoveBack = () => {
        if (moveIndex == 0) return;
        setMoveIndex(moveIndex-1);
    };

    const handleMoveForward = () => {
        if (moveIndex == pgnMoves.length-1) return;
        setMoveIndex(moveIndex+1);
    }

    const handleBackToStart = () => {
        setMoveIndex(0);
    };

    const handleForwardToEnd = () => {
        setMoveIndex(pgnMoves.length-1);
    };

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
            justifyContent: "center"
        }}>
            <ChessBoard config={{fen: allFens[moveIndex], movable: {free: false}}}/>
            <MoveList pgnMoves={pgnMoves}
                      onMoveBack={handleMoveBack}
                      onMoveForward={handleMoveForward}
                      onForwardToEnd={handleForwardToEnd}
                      onBackToStart={handleBackToStart}/>
        </Box>
    );
}
