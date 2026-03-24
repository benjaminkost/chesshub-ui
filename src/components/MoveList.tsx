import {Box} from "@mui/material";
import GameNavBar from "./GameNavBar";
import React from "react";

interface MoveListProps {
    width?: number,
    height?: number,
    pgnMoves: string[],
    setMoveIndex: (moveIndex:number) => void,
    moveIndex: number
}

export default function MoveList({width=200, height=600, pgnMoves, setMoveIndex, moveIndex}:MoveListProps) {

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

    const handleSetMoveIndex = (index: number) => {
        setMoveIndex(index);
    };

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
            overflowY: "auto",
            flexGrow: 1
        }}>
            {
                pgnMoves.map((whiteMove, index) => {
                    if (index % 2 !== 0) return null;

                    const moveCount = Math.floor(index/2) + 1;
                    const blackMove = pgnMoves[index + 1];

                    return (
                        <Box
                            key={moveCount}
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Box sx={{flex: 2, padding: 1, textAlign: "left", backgroundColor: "dimgray", borderRight: "1px solid rgba(255,355,255,255,0.1)"}}>{moveCount}</Box>
                            <Box onClick={() => handleSetMoveIndex(index)}
                                 sx={{padding: 1,
                                     flex: 4,
                                     "&:hover": {
                                     backgroundColor: "lightgray",
                                         cursor: "pointer"
                                 }}}>
                                {whiteMove}
                            </Box>
                            <Box onClick={
                                () => blackMove && handleSetMoveIndex(index+1)
                            } sx={{
                                padding: 1,
                                flex: 4,
                                "&:hover": {
                                    backgroundColor: blackMove ? "lightgray" : "transparent",
                                    cursor: blackMove ? "pointer" : "default"
                                }
                            }}>
                                {blackMove || ""}
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
        <Box sx={{flexShrink: 0}}>
            <GameNavBar onMoveBack={handleMoveBack} onMoveForward={handleMoveForward} onBackToStart={handleBackToStart} onForwardToEnd={handleForwardToEnd} />
        </Box>
    </Box>
);
}