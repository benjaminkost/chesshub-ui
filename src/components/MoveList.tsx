import {Box} from "@mui/material";
import GameNavBar from "./GameNavBar";
import React from "react";
import {defaultStartValue, GameState, GameStateNode} from "@/components/ChessBoardEditor";

interface MoveListProps {
    gameState: GameState,
    onMoveSelect: (activeStateId: string) => void,
    width?: number,
    height?: number
}

export default function MoveList({width=200, height=600, gameState, onMoveSelect}:MoveListProps) {

    const moveHistory = React.useMemo(() => {
        const history: GameStateNode[] = [];
        let currentId: string | null = gameState.activeStateId;

        while(currentId !== null){
            const node:GameStateNode = gameState.allGameStates[currentId];
            if(currentId !== defaultStartValue){
                history.unshift(node);
            }
            currentId = node.parentId;
            console.log("ID from history: %s",currentId);
        }
        return history;
    },[gameState.allGameStates, gameState.rootId]);

    const handleMoveBack = () => {
        console.log("ID from Move Back: %s",gameState.activeStateId);
        if (gameState.activeStateId === defaultStartValue) return;

        const previousMoveId = gameState.allGameStates[gameState.activeStateId].parentId || defaultStartValue;

        onMoveSelect(previousMoveId);
    };

    const handleMoveForward = () => {
        if (gameState.activeStateId == moveHistory.at(-1)?.id) return;

        const nextMoveId = gameState.allGameStates[gameState.activeStateId].nextMoves[0];

        onMoveSelect(nextMoveId);
    }

    const handleBackToStart = () => {
        console.log("ID from move back to Start: %s",gameState.activeStateId);
        onMoveSelect(defaultStartValue);
    };

    const handleForwardToEnd = () => {
        const lastMoveId = moveHistory.at(-1)?.id || "";

        onMoveSelect(lastMoveId);
    };

    const handleSetMoveIndex = (moveId: string) => {
        onMoveSelect(moveId);
    };

    const handleCurrentColorOfCurrentMoveBox = (moveId:string) => {
        if (moveId === gameState.activeStateId){
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
                moveHistory.map((gameStateNode, index) => {
                    if (gameStateNode.color === "w" || gameStateNode.notation === defaultStartValue) return null;

                    const whiteMoveNode = gameStateNode;
                    const blackMoveNode: GameStateNode | null = moveHistory[index+1] || null;

                    return (
                        <Box
                            key={gameStateNode.id}
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Box sx={{flex: 2, padding: 1, textAlign: "left", backgroundColor: "dimgray", borderRight: "1px solid rgba(255,355,255,255,0.1)"}}>{gameStateNode.moveNumber}</Box>
                            <Box onClick={() => handleSetMoveIndex(gameStateNode.id)}
                                 sx={{padding: 1,
                                     flex: 4,
                                     backgroundColor: handleCurrentColorOfCurrentMoveBox(whiteMoveNode.id),
                                     "&:hover": {
                                     backgroundColor: "lightgray",
                                         cursor: "pointer"
                                 }}}>
                                {whiteMoveNode.notation}
                            </Box>
                            {
                                blackMoveNode ?
                                (<Box onClick={
                                    () => blackMoveNode && handleSetMoveIndex(blackMoveNode.id)
                                } sx={{
                                    padding: 1,
                                    flex: 4,
                                    backgroundColor: handleCurrentColorOfCurrentMoveBox(blackMoveNode.id),
                                    "&:hover": {
                                        backgroundColor: "lightgray",
                                        cursor: "pointer"
                                    }
                                }}>
                                    {blackMoveNode.notation}
                                </Box>)
                                    :
                                    (<Box sx={{
                                        padding: 1,
                                        flex: 4
                                    }}/>)
                            }
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