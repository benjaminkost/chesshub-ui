import {Chess, DEFAULT_POSITION} from "chess.js";
import {v4 as uuidv4} from "uuid";
import {defaultStartValue, GameState, GameStateNode} from "@/types/game";

export const parsePgnToGameState= (pgn: string, lastPosition=false):GameState =>  { // TODO: written bei Gemini -> needs review
    const chess = new Chess();
    const rootId = defaultStartValue;

    // Initialer State mit Startaufstellung
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
    // Der Stack speichert die ID, zu der wir nach einer geschlossenen Klammer zurückkehren
    const parentStack: string[] = [];

    // Wir extrahieren Züge, Kommentare und Klammern.
    // RegEx: Züge (e4), Klammern (), oder Kommentare {}
    const tokens = pgn.match(/\(|\)|\d+\.+|[a-zA-Z0-9+#=/-]+|\{[^}]*\}/g) || [];

    tokens.forEach(token => {
        if (token === "(") {
            // Variante startet: Wir speichern den Vater des aktuellen Zuges auf dem Stack
            const currentNode = allGameStates[activeId];
            if (currentNode.parentId) {
                parentStack.push(currentNode.parentId);
            }
        } else if (token === ")") {
            // Variante endet: Wir springen zurück zum letzten gespeicherten Vater
            const lastParent = parentStack.pop();
            if (lastParent) activeId = lastParent;
        } else if (token.startsWith("{") || /^\d+\.+$/.test(token)) {
            // Kommentare oder Zugnummern (1., 1...) ignorieren wir für die Logik
            return;
        } else {
            // Es ist ein echter Zug (z.B. "e4" oder "Nf3")
            try {
                const currentFen = allGameStates[activeId].fen;
                chess.load(currentFen);

                const move = chess.move(token);
                if (move) {
                    const newStateId = uuidv4();
                    const parentNode = allGameStates[activeId];

                    // Neuen Knoten erstellen
                    const newNode: GameStateNode = {
                        id: newStateId,
                        parentId: activeId,
                        notation: move.san,
                        fen: chess.fen(),
                        color: move.color,
                        moveNumber: move.color === "b" ? parentNode.moveNumber : parentNode.moveNumber + 1,
                        nextMoves: []
                    };

                    // In Map speichern
                    allGameStates[newStateId] = newNode;
                    // Verknüpfung beim Vater eintragen
                    allGameStates[activeId].nextMoves.push(newStateId);

                    // Der neue Zug ist nun der aktive Pointer
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