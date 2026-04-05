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

const createSideLine = (gameState:GameState, currentId:string | null):GameStateNode[] => {
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
                    if (gameStateNode.color === "w" || gameStateNode.notation === defaultStartValue) return null;

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
                            <SideLine
                                onMoveSelect={onMoveSelect}
                                whiteMoveNode={whiteMoveNode}
                                blackMoveNode={blackMoveNode}
                                handleCurrentColorOfCurrentMoveBox={handleCurrentColorOfCurrentMoveBox}
                                gameState={gameState}
                            />
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
                    (<Box onClick={
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
                    </Box>)
                    :
                    (<Box sx={{
                        padding: 1,
                        flex: 4
                    }}/>)
            }
        </Box>
    )
}

interface SideLineProps extends MoveProps {
    gameState: GameState
}

function SideLine({gameState, ...props}:SideLineProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "darkgray",
                gap: 1
            }}
        >
            {
                (props.whiteMoveNode.nextMoves.length > 1) &&
                (<Box sx={{display:"flex", flexDirection: "row", gap: 1}}>
                    {createSideLine(gameState, props.whiteMoveNode.nextMoves[1]).map((sideLine) => {
                        return (
                            <Box onClick={() => props.onMoveSelect(sideLine.id)}
                                 sx={{
                                     backgroundColor: props.handleCurrentColorOfCurrentMoveBox(sideLine.id),
                                     "&:hover": {
                                         backgroundColor: "lightgray",
                                         cursor: "pointer"
                                     }
                                 }}
                            >
                                {sideLine.notation}
                            </Box>
                        )
                    })}
                </Box>)}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "darkgray",
                    gap: 1
                }}
            >
                {
                    (props.blackMoveNode?.nextMoves.length > 1) &&
                    (<Box sx={{display:"flex", flexDirection: "row", gap: 1}}>
                        {createSideLine(gameState, props.blackMoveNode.nextMoves[1]).map((sideLine) => {
                            return (
                                <Box onClick={() => props.onMoveSelect(sideLine.id)}
                                     sx={{
                                         backgroundColor: props.handleCurrentColorOfCurrentMoveBox(sideLine.id),
                                         "&:hover": {
                                             backgroundColor: "lightgray",
                                             cursor: "pointer"
                                         }
                                     }}
                                >
                                    {sideLine.notation}
                                </Box>
                            )
                        })}
                    </Box>)
                }
            </Box>
        </Box>
    )
}