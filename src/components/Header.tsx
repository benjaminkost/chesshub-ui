import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button } from "@mui/material";
import ProfileComponent from "./ProfileComponent.js";
import SearchFieldComponent from "./SearchFieldComponent.js";
import MenuButton from "./MenuButton.js";

interface Props{
    loggedIn: boolean
}

export function Header({loggedIn}: Props) {

    return (
        <AppBar position={"sticky"}
                sx={{
                    "background-color": "#bdbdbd",
                    color: "#424242"
                }}
        >
            <Toolbar
                variant={"dense"}
            >
                <MenuButton/>
                <Typography
                    variant="h5"
                >ChessHub</Typography>
                <Box sx={{ flexGrow: 1 }} />
                {loggedIn ?
                    <>
                    <SearchFieldComponent/>
                    <ProfileComponent/>
                    </>
                    :
                    <Button
                        variant={"outlined"}
                        color={"inherit"}>
                        Login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    )
}