import { Chessground } from '@lichess-org/chessground';
import {Api} from "@lichess-org/chessground/api";
import React from "react";
import {Config} from "@lichess-org/chessground/config";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";
import {Chess} from "chess.js";

interface ChessBoardProps{
    heightWidth?: number;
    contained?: boolean;
    config?: Config;
    pgn?: string;
}

export default function ChessBoard({heightWidth=600, contained=false, config={}, pgn=""}: ChessBoardProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [api, setApi] = React.useState<Api | null>(null);

    React.useEffect(() => {
        try{
            const chess = new Chess();

            chess.loadPgn(pgn);
            const history = chess.history({verbose: true});
            const lastMove = history.length > 0 ? [history[history.length-1].from, history[history.length-1].to] : undefined;

            const config = {
                fen: chess.fen(),
                lastMove: lastMove,
                viewOnly: true
            };

            if (ref.current && !api){
                const chessGround = Chessground(ref.current,
                    {animation: {enabled: true, duration: 200}
                        ,...config});
                setApi(chessGround);
            } else if(ref.current && api){
                api.set(config);
            }
        } catch (e){
            console.log("Error in pgn: ", e);
        }
    }, [ref]);

    React.useEffect(() => {
        api?.set(config);
    }, [api, config]);

    return (
        <div style={{height: contained ? '100%' : heightWidth, width: contained ? '100%' : heightWidth}}>
            <div ref={ref} style={{height: '100%', width: '100%', display: 'table'}}/>
        </div>
    );
}