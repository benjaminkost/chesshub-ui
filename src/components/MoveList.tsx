import {Box} from "@mui/material";
import GameNavBar from "./GameNavBar";
import React from "react";
import {defaultStartValue, GameState, GameStateNode} from "@/types/models/game.model";
import {StockfishTurnOnBar} from "@/components/StockfishTurnOnBar";
import {createMainLine} from "@/api/utils/interactWithGameState";
import {tokens} from "@/styles/theme";

interface MoveListProps {
    gameState: GameState,
    onMoveSelect: (activeStateId: string) => void,
    setEvaluation: (id: string, evaluation: number | null) => void,
    width?: number,
    height?: number
}

export default function MoveList({width=200, height=600, gameState, setEvaluation, onMoveSelect}:MoveListProps) {
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
            return tokens.color.surfaceContainerHighest;
        } else {
            return "transparent";
        }
    }

    return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            width: width,
            height: height,
            ml: 5,
        }}
    >
        <StockfishTurnOnBar fen={gameState.allGameStates[gameState.activeStateId || defaultStartValue]?.fen}
                            id={gameState.activeStateId}
                            setEvaluation={setEvaluation}
                            evaluation={gameState.allGameStates[gameState.activeStateId || defaultStartValue].analysis?.eval?.centiPawn}/>
        <Box sx={{
            backgroundColor: tokens.color.surfaceContainer,
            color: tokens.color.onSurface,
            overflowY: "auto",
            flexGrow: 1,
            borderRadius: `${tokens.radius.md} ${tokens.radius.md} 0 0`,
        }}>
            {
                mainLineStateHistory.map((gameStateNode, index) => {
                    if (gameStateNode.color === "b" || gameStateNode.notation === defaultStartValue) return null;

                    const whiteMoveNode = mainLineStateHistory[index];
                    const blackMoveNode: GameStateNode | null = mainLineStateHistory[index+1] || null;

                    return (
                        <Box
                            key={gameStateNode.id}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Move onMoveSelect={onMoveSelect}
                                  whiteMoveNode={whiteMoveNode}
                                  blackMoveNode={blackMoveNode}
                                  handleCurrentColorOfCurrentMoveBox={handleCurrentColorOfCurrentMoveBox}/>

                            {
                                (whiteMoveNode.nextMoves.length > 1 || blackMoveNode?.nextMoves.length > 1) &&
                                <Box sx={{
                                    pt: 0.75,
                                    pb: 0.75,
                                    backgroundColor: tokens.color.surfaceContainerLow,
                                    borderLeft: `2px solid ${tokens.color.tertiary}`,
                                    ml: 1,
                                }}>
                            {
                                whiteMoveNode.nextMoves.length > 1 &&
                                whiteMoveNode.nextMoves.slice(1).map((id)=> {
                                    const node = gameState.allGameStates[id];
                                    return (
                                        <SideLine
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
    blackMoveNode: GameStateNode | null;
    handleCurrentColorOfCurrentMoveBox: (id: string) => string;
}

function Move({onMoveSelect, whiteMoveNode, blackMoveNode, handleCurrentColorOfCurrentMoveBox}:MoveProps) {
    return (
        <Box
            key={whiteMoveNode.id}
            sx={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Box sx={{
                flex: 2,
                padding: 1,
                textAlign: "left",
                backgroundColor: tokens.color.surfaceContainerLow,
                color: tokens.color.onSurfaceVariant,
                fontSize: "0.75rem",
                letterSpacing: "0.025em",
            }}>
                {whiteMoveNode.moveNumber}</Box>
            <Box onClick={() => onMoveSelect(whiteMoveNode.id)}
                 sx={{
                     padding: 1,
                     flex: 4,
                     fontFamily: tokens.font.body,
                     backgroundColor: handleCurrentColorOfCurrentMoveBox(whiteMoveNode.id),
                     color: tokens.color.onSurface,
                     transition: `background-color ${tokens.transition.base}`,
                     "&:hover": {
                         backgroundColor: tokens.color.surfaceBright,
                         cursor: "pointer",
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
                        fontFamily: tokens.font.body,
                        backgroundColor: handleCurrentColorOfCurrentMoveBox(blackMoveNode.id),
                        color: tokens.color.onSurface,
                        transition: `background-color ${tokens.transition.base}`,
                        "&:hover": {
                            backgroundColor: tokens.color.surfaceBright,
                            cursor: "pointer",
                        }
                    }}>
                        {blackMoveNode.notation}
                    </Box>
                    :
                    (<Box sx={{
                        padding: 1,
                        flex: 4,
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
                gap: 0.5,
                pl: variantDepth,
                alignItems: "baseline",
                fontSize: 13,
                color: tokens.color.onSurfaceVariant,
            }}
        >
            <Box sx={{display:"flex", flexDirection: "row", flexWrap: "wrap", gap: 0.75}}>
                    {createMainLine(gameState, currentNode.id).map((sideLine) => {
                        return (
                            <React.Fragment key={sideLine.id}>
                                {
                                    (sideLine.color === "b") && (gameState.allGameStates[sideLine.parentId || defaultStartValue].nextMoves[0] !== sideLine.id)
                                    ?
                                        <Box>{sideLine.moveNumber}... </Box>
                                    : (sideLine.color === "w") && <Box>{sideLine.moveNumber}. </Box>
                                }
                                <Box
                                    onClick={() => onMoveSelect(sideLine.id)}
                                     sx={{
                                         color: tokens.color.onSurfaceVariant,
                                         transition: `color ${tokens.transition.base}`,
                                         backgroundColor: handleCurrentColorOfCurrentMoveBox(sideLine.id),
                                         "&:hover": {
                                             color: tokens.color.onSurface,
                                             cursor: "pointer",
                                         }
                                     }}
                                >
                                    {sideLine.notation}
                                </Box>
                            </React.Fragment>)
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
                                        key={id}
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