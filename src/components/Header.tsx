import {
    AppBar,
    Toolbar,
    Box,
    Button } from "@mui/material";
import ProfileComponent, {defaultMenuElements, ProfileProps} from "./ProfileComponent";
import SearchFieldComponent from "./SearchFieldComponent";
import MenuButton, {defaultNavItems, MenuButtonProps} from "./MenuButton";
import {useNavigate} from "react-router-dom";
import {HomeIcon} from "@/components/HomeIcon";

export interface HeaderProps extends ProfileProps, MenuButtonProps{
    loggedIn: boolean;
}

export function Header({loggedIn, menuElements = defaultMenuElements, navItems = defaultNavItems}: HeaderProps) {

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
                    <MenuButton navItems={navItems}/>
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