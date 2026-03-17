import {Box} from "@mui/material";
import GameNavBar from "./GameNavBar.js";
import React from "react";

interface MoveListProps {
    width?: number,
    height?: number,
    pgnMoves: string[],
    onMoveBack: () => void,
    onMoveForward: () => void,
    onBackToStart: () => void,
    onForwardToEnd: () => void,
    handleSetMoveIndex: (index: number) => void;
}

export default function MoveList({width=200, height=600, pgnMoves, onMoveBack, onBackToStart, onMoveForward, onForwardToEnd, handleSetMoveIndex}:MoveListProps) {

    return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            width: width,
            height: height,
            ml: 5
        }}
    >
        <Box sx={{
            backgroundColor: "gray",
            color: "white",
            overflowY: "auto"
        }}>
            {
                pgnMoves.map((whiteMove, index) => {
                    if (index % 2 !== 0) return null;

                    const moveCount = Math.floor(index/2) + 1;
                    const blackMove = pgnMoves[index + 1];

                    return (
                        <Box
                            sx={{
                                display: "flex"
                            }}
                        >
                            <Box sx={{flex: 2, padding: 1, textAlign: "left", backgroundColor: "dimgray", borderRight: "1px solid rgba(255,355,255,255,0.1)"}}>{moveCount}</Box>
                            <Box key={index} onClick={() => handleSetMoveIndex(index)} sx={{padding: 1, flex: 4, "&:hover": {backgroundColor: "lightgray"}}}>{whiteMove}</Box>
                            {blackMove && <Box key={index+1} onClick={() => handleSetMoveIndex(index+1)} sx={{padding: 1, flex: 4, "&:hover": {backgroundColor: "lightgray"}}}>{blackMove}</Box>}
                        </Box>
                    )
                })
            }
        </Box>
        <Box sx={{flexShrink: 0}}>
            <GameNavBar onMoveBack={onMoveBack} onMoveForward={onMoveForward} onBackToStart={onBackToStart} onForwardToEnd={onForwardToEnd} />
        </Box>
    </Box>
);
}