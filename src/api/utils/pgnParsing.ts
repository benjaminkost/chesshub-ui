import {Chess, DEFAULT_POSITION} from "chess.js";
import {v4 as uuidv4} from "uuid";
import {defaultStartValue, GameState, GameStateNode} from "@/types/models/game.model";
import {GameRequest} from "@benaurel/chesshub-core-client";

export const parsePgnToGameState= (pgn: string, lastPosition=false):GameState =>  {
    const chess = new Chess();
    const rootId = defaultStartValue;

    // Initial state with starting position
    const allGameStates: Record<string, GameStateNode> = {
        [rootId]: {
            id: rootId,
            parentId: null,
            moveNumber: 0,
            notation: defaultStartValue,
            fen: DEFAULT_POSITION,
            color: "b",
            nextMoves: []
        }
    };

    let activeId = rootId;
    // The stack saves the id which we will return to when variation ends
    const parentStack: string[] = [];

    // Extract moves, parentheses, comments
    // RegEx: Moves (e4), Parentheses (), or Comments {}
    const tokens = pgn.match(/\(|\)|\d+\.+|[a-zA-Z0-9+#=\/-]+|\{[^}]*}/g) || [];

    tokens.forEach(token => {
        if (token === "(") {
            // Variant starts: we save the parent of the current move on the stack
            const currentNode = allGameStates[activeId];
            if (currentNode.parentId) {
                activeId = currentNode.parentId
                parentStack.push(currentNode.id);
            }
        } else if (token === ")") {
            // Variant ends: we jump back to the parent
            const lastParent = parentStack.pop();
            if (lastParent) activeId = lastParent;
        } else if (token.startsWith("{") || /^\d+\.+$/.test(token)) {
            // comments will be discarded for now
            return;
        } else {
            // it is a move
            try {
                const currentFen = allGameStates[activeId].fen;
                chess.load(currentFen);

                const move = chess.move(token);
                if (move) {
                    const newStateId = uuidv4();
                    const parentNode = allGameStates[activeId];

                    // Create new node
                    const newNode: GameStateNode = {
                        id: newStateId,
                        parentId: activeId,
                        notation: move.san,
                        fen: chess.fen(),
                        color: move.color,
                        moveNumber: move.color === "b" ? parentNode.moveNumber : parentNode.moveNumber + 1,
                        nextMoves: []
                    };

                    // Save in map
                    allGameStates[newStateId] = newNode;
                    // Add child node to parent node
                    allGameStates[activeId].nextMoves.push(newStateId);

                    // The current node is now the active node
                    activeId = newStateId;
                }
            } catch (e) {
                console.error("Ungültiger Zug im PGN:", token);
            }
        }
    });

    return {
        rootId,
        activeStateId: lastPosition ? activeId : defaultStartValue,
        allGameStates
    };
}

export const parsePGN = (pgnString: string, teamId?: number): GameRequest => {
    const lines = pgnString.split('\n');
    const result: Partial<GameRequest> = {
        moves: '',
        teamId: teamId
    };

    const tagRegex = /\[(\w+)\s+"(.*?)"\]/;

    lines.forEach(line => {
        const match = line.match(tagRegex);
        if (match) {
            const [_, key, value] = match;
            switch (key.toLowerCase()) {
                case 'white':
                    result.whitePlayer = {
                        firstName: value.split(" ").at(0) || "",
                        lastName: value.split(" ").at(-1) || ""
                    };
                    break;
                case 'black':
                    result.blackPlayer = {
                        firstName: value.split(" ").at(0) || "",
                        lastName: value.split(" ").at(-1) || ""
                    };
                    break;
                case 'date':
                    result.date = value;
                    break;
                case 'event':
                    result.event = value;
                    break;
            }
        } else if (line.trim() !== '' && !line.startsWith('[')) {
            result.moves += line.trim() + ' ';
        }
    });

    return {
        ...result,
        moves: result.moves?.trim() || ''
    } as GameRequest;
};