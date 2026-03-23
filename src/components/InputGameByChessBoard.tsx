import {Box} from "@mui/material";
import ChessBoard from "@/components/ChessBoard";
import MoveList from "@/components/MoveList";
import React from "react";

export function InputGameByChessBoard(){
    const [moveIndex, setMoveIndex] = React.useState<number>(0);
    const [pgnMoves, setPgnMoves] = React.useState<string[]>([]);

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
                <ChessBoard />
                <MoveList pgnMoves={pgnMoves} setMoveIndex={setMoveIndex} moveIndex={moveIndex}/>
            </Box>
        </Box>
    )
}