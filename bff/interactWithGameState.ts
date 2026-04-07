import {GameState, GameStateNode} from "@/types/game";

export const createMainLine = (gameState:GameState, currentId:string | null):GameStateNode[] => {
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