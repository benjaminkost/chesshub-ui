import {Box} from "@mui/material";
import GameNavBar from "./GameNavBar";
import React from "react";
import {defaultStartValue, GameState, GameStateNode} from "@/types/game";

interface MoveListProps {
    gameState: GameState,
    onMoveSelect: (activeStateId: string) => void,
    width?: number,
    height?: number
}

const createMainLine = (gameState:GameState, currentId:string | null):GameStateNode[] => {
    const history: GameStateNode[] = [];

    while(currentId !== null){
        const node:GameStateNode = gameState.allGameStates[currentId];
        if (gameState.rootId !== node.id){
            history.push(node);
        }
        currentId = node.nextMoves[0] || null;
    }

   return history;
}

export default function MoveList({width=200, height=600, gameState, onMoveSelect}:MoveListProps) {
    const mainLineStateHistory = React.useMemo(() => {
        let currentId: string | null = gameState.rootId;
        return createMainLine(gameState, currentId);
    },[gameState.allGameStates, gameState.rootId]);

    const currentSideLines:GameStateNode[][] | null = React.useMemo(() => {
        const parentId:string = gameState.allGameStates[gameState.activeStateId].parentId || defaultStartValue;
        const parentNode = gameState.allGameStates[parentId];

        if (parentNode.nextMoves.length <= 1) return null;

        const siblingsIds:string[] = parentNode.nextMoves.filter(id => id !== gameState.activeStateId);

        return siblingsIds.map(id => createMainLine(gameState, id));

    }, [gameState.activeStateId]);

    const handleMoveBack = () => {
        if (gameState.activeStateId === defaultStartValue) return;

        const previousMoveId = gameState.allGameStates[gameState.activeStateId].parentId || defaultStartValue;

        onMoveSelect(previousMoveId);
    };

    const handleMoveForward = () => {
        if (gameState.activeStateId == mainLineStateHistory.at(-1)?.id) return;

        const nextMoveId = gameState.allGameStates[gameState.activeStateId].nextMoves[0];

        onMoveSelect(nextMoveId);
    }

    const handleBackToStart = () => {
        console.log("ID from move back to Start: %s",gameState.activeStateId);
        onMoveSelect(defaultStartValue);
    };

    const handleForwardToEnd = () => {
        const lastMoveId = mainLineStateHistory.at(-1)?.id || "";

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
                mainLineStateHistory.map((gameStateNode, index) => {
                    if (gameStateNode.color === "w" || gameStateNode.notation === defaultStartValue) return null;

                    const whiteMoveNode = gameStateNode;
                    const blackMoveNode: GameStateNode | null = mainLineStateHistory[index+1] || null;

                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                key={gameStateNode.id}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row"
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
                            <Box>
                                {
                                    currentSideLines &&
                                    currentSideLines.map((sideLines) => {
                                        return (<Box sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}>
                                                {sideLines.map((moveNode)=>{
                                                    return (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                backgroundColor: "darkgray"
                                                        }}
                                                        >
                                                            {moveNode.notation}
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
        <Box>
            <GameNavBar onMoveBack={handleMoveBack} onMoveForward={handleMoveForward} onBackToStart={handleBackToStart} onForwardToEnd={handleForwardToEnd} />
        </Box>
    </Box>
);
}