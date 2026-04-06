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
        debugger;
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
        onMoveSelect(defaultStartValue);
    };

    const handleForwardToEnd = () => {
        const lastMoveId = mainLineStateHistory.at(-1)?.id || "";

        onMoveSelect(lastMoveId);
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
                    if (gameStateNode.color === "b" || gameStateNode.notation === defaultStartValue) return null;

                    const whiteMoveNode = mainLineStateHistory[index];
                    const blackMoveNode: GameStateNode | null = mainLineStateHistory[index+1] || null;

                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Move onMoveSelect={onMoveSelect}
                                  whiteMoveNode={whiteMoveNode}
                                  blackMoveNode={blackMoveNode}
                                  handleCurrentColorOfCurrentMoveBox={handleCurrentColorOfCurrentMoveBox}/>
                            {
                                whiteMoveNode.nextMoves.length > 1 &&
                                whiteMoveNode.nextMoves.slice(1).map((id)=> {
                                    const node = gameState.allGameStates[id];
                                    return (<SideLine
                                                currentNode={node}
                                                onMoveSelect={onMoveSelect}
                                                handleCurrentColorOfCurrentMoveBox={handleCurrentColorOfCurrentMoveBox}
                                                gameState={gameState}
                                                variantDepth={1}
                                    />)
                                })
                            }
                            {
                                blackMoveNode?.nextMoves.length > 1 &&
                                blackMoveNode.nextMoves.slice(1).map((id)=> {
                                    const node = gameState.allGameStates[id];
                                    return (<SideLine
                                        currentNode={node}
                                        onMoveSelect={onMoveSelect}
                                        handleCurrentColorOfCurrentMoveBox={handleCurrentColorOfCurrentMoveBox}
                                        gameState={gameState}
                                        variantDepth={1}
                                    />)
                                })
                            }
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

interface MoveProps {
    onMoveSelect: (id: string) => void;
    whiteMoveNode: GameStateNode;
    blackMoveNode: GameStateNode;
    handleCurrentColorOfCurrentMoveBox: (id: string) => string;
}

function Move({onMoveSelect, whiteMoveNode, blackMoveNode, handleCurrentColorOfCurrentMoveBox}:MoveProps) {
    return (
        <Box
            key={whiteMoveNode.id}
            sx={{
                display: "flex",
                flexDirection: "row"
            }}
        >
            <Box sx={{flex: 2, padding: 1, textAlign: "left", backgroundColor: "dimgray", borderRight: "1px solid rgba(255,355,255,255,0.1)"}}>
                {whiteMoveNode.moveNumber}</Box>
            <Box onClick={() => onMoveSelect(whiteMoveNode.id)}
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
                    <Box onClick={
                        () => blackMoveNode && onMoveSelect(blackMoveNode.id)
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
                    </Box>
                    :
                    (<Box sx={{
                        padding: 1,
                        flex: 4
                    }}/>)
            }
        </Box>
    )
}

interface SideLineProps {
    currentNode: GameStateNode;
    onMoveSelect: (id: string) => void;
    handleCurrentColorOfCurrentMoveBox: (id: string) => string;
    gameState: GameState;
    variantDepth: number;
}

function SideLine({currentNode, onMoveSelect, handleCurrentColorOfCurrentMoveBox, gameState, variantDepth}:SideLineProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "darkgray",
                gap: 1,
                pl: variantDepth
            }}
        >
            <Box sx={{display:"flex", flexDirection: "row", flexWrap: "wrap", gap: 1}}>
                    {createMainLine(gameState, currentNode.id).map((sideLine) => {
                        debugger;
                        return (
                            <>
                                {
                                    (sideLine.color === "b") && (gameState.allGameStates[sideLine.parentId]?.nextMoves[0] !== sideLine.id)
                                    ?
                                        <Box>{sideLine.moveNumber}... </Box>
                                    : (sideLine.color === "w") && <Box>{sideLine.moveNumber}. </Box>
                                }
                                <Box onClick={() => onMoveSelect(sideLine.id)}
                                     sx={{
                                         backgroundColor: handleCurrentColorOfCurrentMoveBox(sideLine.id),
                                         "&:hover": {
                                             backgroundColor: "lightgray",
                                             cursor: "pointer"
                                         }
                                     }}
                                >
                                    {sideLine.notation}
                                </Box>
                            </>)
                    })}
            </Box>
            <Box sx={{display:"flex", flexDirection: "row"}}>
                {createMainLine(gameState, currentNode.id).map((sideLine) => {
                    return (
                        <>
                            {
                            sideLine.nextMoves.length > 1 &&
                                sideLine.nextMoves.slice(1).map((id)=> {
                                    const node = gameState.allGameStates[id];
                                    return (<SideLine
                                        currentNode={node}
                                        onMoveSelect={onMoveSelect}
                                        handleCurrentColorOfCurrentMoveBox={handleCurrentColorOfCurrentMoveBox}
                                        gameState={gameState}
                                        variantDepth={variantDepth+1}
                                    />)
                                })
                            }
                        </>)
                })}
            </Box>
        </Box>
    )
}