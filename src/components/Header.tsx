import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button } from "@mui/material";
import ProfileComponent, {defaultMenuElements} from "./ProfileComponent.js";
import SearchFieldComponent from "./SearchFieldComponent.js";
import MenuButton, {defaultDrawerElements} from "./MenuButton.js";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";

interface HeaderProps{
    loggedIn: boolean;
    menuElements?: string[];
    drawerElements?: string[];
}

export function Header({loggedIn, menuElements = defaultMenuElements, drawerElements = defaultDrawerElements}: HeaderProps) {

    const navigate = useNavigate();

    const loginButton = () => {
        navigate("/auth/signin");
    }

    return (
        <AppBar position={"sticky"}
                sx={{
                    "background-color": "#bdbdbd",
                    color: "#424242",
                    height: 80
                }}
        >
            <Toolbar
                variant={"dense"}
                sx={{top: 20, bottom: 20}}
            >
                {
                    loggedIn &&
                    <MenuButton drawerElements={drawerElements}/>
                }
                <Typography
                    variant="h5"
                    sx={{
                        alignItems: 'center',
                        "&:hover": {color: "primary.main"}
                    }}
                    to={"/"}
                    component={Link}
                    >
                    ChessHub
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {loggedIn ?
                    <>
                    <SearchFieldComponent/>
                    <ProfileComponent menuElements={menuElements}/>
                    </>
                    :
                    <Button
                        variant={"outlined"}
                        color={"inherit"}
                        onClick={loginButton}
                    >
                        Login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    )
}