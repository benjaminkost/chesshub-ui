import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import {Link} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Props{
    loggedIn: Boolean
}

export function Header({loggedIn}: Props) {

    if (loggedIn){

    }

    return (
        <>
            <AppBar position={"static"} color={"success"}>
                <Toolbar variant={"dense"}>
                    <IconButton id={"menuButton"} >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                    >ChessHub</Typography>
                    <Box sx={{flexGrow: 1}} />
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}