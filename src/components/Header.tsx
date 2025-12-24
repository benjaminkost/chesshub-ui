import { Stack, Button } from "@mui/material";
import {Link} from "react-router-dom";
import bild from '@/assets/images/black_pawn.png';
import MenuIcon from '@mui/icons-material/Menu';

class Props{
    loggedIn: Boolean
}

export function Header({loggedIn}: Props) {

    if (loggedIn){

    }

    return (
        <>
            <Stack direction={"row"} spacing={2} >
                <h1>ChessHub</h1>
                <Button id={"menuButton"} startIcon={<MenuIcon />} variant={"text"}>
                </Button>
                {
                    loggedIn &&
                    <div id={"profile"}>
                        <img src={bild} alt={"Profile"} width={100}/>
                    </div>
                }
                <div id={"homePageButton"}>
                    <img src={bild} alt={"Black Pawn"} width={100}/>
                </div>
            </Stack>
        </>
    )
}