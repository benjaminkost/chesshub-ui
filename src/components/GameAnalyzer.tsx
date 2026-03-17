import { Box } from "@mui/material";
import ChessBoard from "./ChessBoard.js";
import MoveList from "./MoveList.js";
import {pgnStringToMoveList} from "../../bff/pgnStringToMoveList.js";

interface GameAnalyzerProps {
    pgn: string
}


export default function GameAnalyzer({pgn}: GameAnalyzerProps) {
    const pgnMoves = pgnStringToMoveList(pgn);

    return (
        <Box sx={{
            display: "flex"
        }}>
            <ChessBoard/>
            <MoveList pgnMoves={pgnMoves}/>
        </Box>
    );
}
