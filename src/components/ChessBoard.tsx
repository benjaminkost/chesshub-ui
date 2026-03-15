import { Chessground } from '@lichess-org/chessground';
import {Api} from "@lichess-org/chessground/api";
import React from "react";
import {Config} from "@lichess-org/chessground/config";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";

interface ChessBoardProps{
    heightWidth?: number;
    contained?: boolean;
    config?: Config;
}

export default function ChessBoard({heightWidth=900, contained=false, config={}}: ChessBoardProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [api, setApi] = React.useState<Api | null>(null);

    React.useEffect(() => {
        if (ref && ref.current && !api){
            const chessGround = Chessground(ref.current,
                {animation: {enabled: true, duration: 200}
                ,...config});
            setApi(chessGround);
        } else if(ref && ref.current && api){
            api.set(config);
        }
    }, [ref]);

    React.useEffect(() => {
        api?.set(config);
    }, [api, config]);

    return (
        <div className={"cg-board-wrap"} style={{height: contained ? '100%' : heightWidth, width: contained ? '100%' : heightWidth}}>
            <div ref={ref} style={{height: '100%', width: '100%', display: 'table'}}/>
        </div>
    );
}