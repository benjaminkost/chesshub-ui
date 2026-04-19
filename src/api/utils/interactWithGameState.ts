import {GameState, GameStateNode} from "@/types/models/game.model";

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

export const convertGameStateToPgn = (gameState: GameState): string => { //TODO: Written by Gemini need review
    const { allGameStates, rootId } = gameState;

    // Hilfsfunktion: Generiert den Text für einen einzelnen Knoten
    const getMoveText = (node: GameStateNode, forceNum: boolean): { text: string; hasComment: boolean } => {
        if (node.id === rootId) {
            // Die Startposition hat keine eigene Notation, kann aber einen Kommentar haben
            const rootComment = node.comment ? `{${node.comment}}` : "";
            return { text: rootComment, hasComment: !!node.comment };
        }

        let text = "";
        if (node.color === "w") {
            text = `${node.moveNumber}. ${node.notation}`;
        } else {
            // Schwarz braucht die Nummer, wenn forceNum true ist (z.B. nach Variationen)
            text = forceNum ? `${node.moveNumber}... ${node.notation}` : node.notation;
        }

        // Kommentare und Engine-Evaluierungen sammeln
        const comments: string[] = [];
        if (node.comment) {
            comments.push(node.comment);
        }

        // Engine-Analyse in den standardisierten PGN-Format-Tag [%eval] umwandeln
        if (node.analysis && node.analysis.eval) {
            const ev = node.analysis.eval;
            if (ev.isMate && ev.mateIn !== undefined) {
                comments.push(`[%eval #${ev.mateIn}]`);
            } else if (ev.centiPawn !== null && ev.centiPawn !== undefined) {
                comments.push(`[%eval ${ev.centiPawn / 100}]`);
            }
        }

        const hasComment = comments.length > 0;
        if (hasComment) {
            text += ` {${comments.join(" ")}}`;
        }

        return { text, hasComment };
    };

    // Rekursive Hauptfunktion: Baut die Zugfolge auf
    const buildSequence = (startNodeId: string, forceStartNum: boolean): string => {
        let currentId: string | undefined = startNodeId;
        let pgn = "";
        let forceNum = forceStartNum;

        while (currentId) {
            const node: GameStateNode = allGameStates[currentId];
            if (!node) break;

            // 1. Aktuellen Zug rendern
            const move = getMoveText(node, forceNum);
            if (pgn && move.text) {
                pgn += " ";
            }
            pgn += move.text;

            const parent = node.parentId ? allGameStates[node.parentId] : null;

            // 2. Variationen (Geschwister-Knoten) rendern
            // Wir rendern Variationen immer DANN, wenn wir der Hauptzug (Index 0) unseres Parents sind.
            if (parent && parent.nextMoves[0] === node.id) {
                let hasVariations = false;

                // Alle weiteren Kinder des Parents sind Alternativen (Variationen) zu unserem aktuellen node
                for (let i = 1; i < parent.nextMoves.length; i++) {
                    hasVariations = true;
                    const varId = parent.nextMoves[i];
                    const varPgn = buildSequence(varId, true); // In Variationen immer Nummern erzwingen
                    if (varPgn) {
                        pgn += pgn ? ` (${varPgn})` : `(${varPgn})`;
                    }
                }

                // Wenn Variationen oder Kommentare eingefügt wurden, muss der nächste Zug (falls Schwarz) die Nummer haben
                forceNum = hasVariations || move.hasComment;
            } else if (node.id === rootId) {
                forceNum = true; // Der allererste Zug im Spiel muss forciert werden (Wichtig, falls Spiel mit Schwarz startet)
            } else {
                forceNum = move.hasComment;
            }

            // 3. Im Hauptpfad weitergehen
            if (!node.nextMoves || node.nextMoves.length === 0) {
                break;
            }
            currentId = node.nextMoves[0];
        }

        return pgn.trim();
    };

    return buildSequence(rootId, true);
};