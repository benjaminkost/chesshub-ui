import {Box} from "@mui/material";
import GameNavBar from "./GameNavBar";
import React from "react";

interface MoveListProps {
    width?: number,
    height?: number,
    moveList: string[],
    currentPositionIndex: number,
    setCurrentPositionIndex: (positionIndex:number) => void
}

export default function MoveList({width=200, height=600, moveList, setCurrentPositionIndex, currentPositionIndex}:MoveListProps) {
    const currentColoredBox = React.useMemo(() => {
        return currentPositionIndex;
    },[currentPositionIndex]);

    const handleMoveBack = () => {
        if (currentPositionIndex == 0) return;
        setCurrentPositionIndex(currentPositionIndex-1);
    };

    const handleMoveForward = () => {
        if (currentPositionIndex == moveList.length) return;
        setCurrentPositionIndex(currentPositionIndex+1);
    }

    const handleBackToStart = () => {
        setCurrentPositionIndex(0);
    };

    const handleForwardToEnd = () => {
        setCurrentPositionIndex(moveList.length);
    };

    const handleSetMoveIndex = (index: number) => {
        setCurrentPositionIndex(index);
    };

    const handleCurrentColorOfCurrentMoveBox = (BoxIndex:number) => {
        if (BoxIndex === currentColoredBox-1){
            return "black"
        } else {
            return "inherit";
        }
    }

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
                moveList.map((whiteMove, index) => {
                    if (index % 2 !== 0) return null;

                    const moveCount = Math.floor(index/2) + 1;
                    const blackMove = moveList[index + 1];

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
                                     backgroundColor: handleCurrentColorOfCurrentMoveBox(index),
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
                                backgroundColor: blackMove ? handleCurrentColorOfCurrentMoveBox(index+1) : "transparent",
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