export function pgnStringToMoveList(pgn:string): string[]{
    const pgnMoves = pgn.split(/\n\n/).at(-1).replace(/\n/g, " ");
    const regexMove = /[TNKQBSLD]?[a-h]?[1-8]?x?[a-h][1-8](?:=[TNKQBSLD])?[\\+#]?|O-O(?:-O)?/g;

    return pgnMoves.match(regexMove) || [];
}