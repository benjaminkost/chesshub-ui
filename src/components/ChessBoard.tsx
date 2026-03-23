import { Chessground } from '@lichess-org/chessground';
import {Api} from "@lichess-org/chessground/api";
import React from "react";
import {Config} from "@lichess-org/chessground/config";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";
import { Box } from "@mui/material";

interface ChessBoardProps{
    heightWidth?: number;
    contained?: boolean;
    config?: Config;
}

export default function ChessBoard({heightWidth=600,
                                       contained=false,
                                       config={}
                                   }: ChessBoardProps) {
    const [chessBoardApi, setChessBoardApi] = React.useState<Api | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref && ref.current && !chessBoardApi){
            const chessGround = Chessground(ref.current,
                {animation: {enabled: true, duration: 200}
                ,...config});
            setChessBoardApi(chessGround);
        } else if(ref && ref.current && chessBoardApi){
            chessBoardApi.set(config);
        }
    }, [ref]);

    React.useEffect(() => {
        chessBoardApi?.set(config);
    }, [chessBoardApi, config]);

    return (
        <Box sx={{height: contained ? '100%' : heightWidth, width: contained ? '100%' : heightWidth}}>
            <Box ref={ref} style={{height: '100%', width: '100%', display: 'table'}}/>
        </Box>
    );
}