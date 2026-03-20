import {
    AppBar,
    Toolbar,
    Box,
    Button } from "@mui/material";
import ProfileComponent, {defaultMenuElements} from "./ProfileComponent";
import SearchFieldComponent from "./SearchFieldComponent";
import MenuButton, {defaultDrawerElements} from "./MenuButton";
import {useNavigate} from "react-router-dom";
import {HomeIcon} from "@/components/HomeIcon";

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
                <HomeIcon/>
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