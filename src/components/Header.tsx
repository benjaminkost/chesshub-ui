import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {ProfileComponent} from "./ProfileComponent";
import SearchFieldComponent from "./SearchFieldComponent";
import {MenuButton} from "./MenuButton";
import {useNavigate} from "react-router-dom";
import {HomeIcon} from "@/components/HomeIcon";
import {ROUTES} from "@/routes";
import {useAuth} from "@/context/AuthContext";
import {NavItem} from "@/types/viewmodels/navigation.vm";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DescriptionIcon from "@mui/icons-material/Description";
import React from "react";
import {AppRole} from "@/types/common/roles";

export function Header() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const menuElements = [
        { label: "Logout", path: ROUTES.HOME.func()}
    ];

    if (isLoggedIn && user) {
        menuElements.push(
            {label: "Mein Account", path: ROUTES.USER.SETTINGS.func(user.id)},
        )
    }

    const drawerNavItems: NavItem[] = [
        {label: "Partie erstellen", path: ROUTES.GAMES.CREATE.func(), icon: <AddIcon/>}
    ];

    if (user) {
        drawerNavItems.push(
            {label: "Eigene Partien", path: ROUTES.GAMES.LIST_USER.func(user.id), icon: <HistoryIcon/>}
        )
        if (user.clubIds) {
            drawerNavItems.push(
                {
                    label: "Vereinszugehörigkeit",
                    path: ROUTES.USER.CLUB_AFFILIATION.func(user.clubIds[0]),
                    icon: < OtherHousesIcon/>
                }
            )
        }

        if (user.clubIds) {
            // TODO: Change ClubGamesHistory Page so there is a switcher for which club (that the user is apart of)
            // to see the games
            const firstClubInList = user.clubIds[0];
            drawerNavItems.push(
                {label: "Vereinspartien", path: ROUTES.GAMES.LIST_CLUB.func(firstClubInList), icon: <Diversity3Icon/>}
            )
        }

        if (user?.appRole === AppRole.SUPPORT || user?.appRole === AppRole.SUPER_ADMIN) {
            user.clubIds && drawerNavItems.push({
                label: "Vereinsverwaltung",
                path: ROUTES.CLUBS.MANAGE.func(user.clubIds[0]),
                icon: <ManageSearchIcon/>
            });
            user.teamIds && drawerNavItems.push({
                label: "Mannschaftsverwaltung",
                path: ROUTES.TEAMS.MANAGE.func(user.teamIds[0]),
                icon: <DescriptionIcon/>
            });
        }
    }

    const loginButton = () => {
        navigate(ROUTES.AUTH.LOGIN.func());
    }

    return (
        <AppBar position={"sticky"}
                sx={{
                    backgroundColor: "#bdbdbd",
                    color: "#424242",
                    height: 80
                }}
        >
            <Toolbar
                variant={"dense"}
                sx={{top: 20, bottom: 20}}
            >
                {
                    isLoggedIn &&
                    <MenuButton navItems={drawerNavItems}/>
                }
                <HomeIcon/>
                <Box sx={{ flexGrow: 1 }} />
                {isLoggedIn ?
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