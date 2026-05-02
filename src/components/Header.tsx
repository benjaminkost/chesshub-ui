import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {ProfileComponent} from "./ProfileComponent";
import {MenuButton} from "./MenuButton";
import {useNavigate} from "react-router-dom";
import {HomeIcon} from "@/components/HomeIcon";
import {ROUTES} from "@/routes";
import {useAuth} from "@/context/AuthContext";
import {MenuElement, NavItem} from "@/types/viewmodels/navigation.vm";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DescriptionIcon from "@mui/icons-material/Description";
import React from "react";
import {AppRole} from "@/types/common/roles";
import {tokens} from "@/styles/theme";

export function Header() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const menuElements: MenuElement[] = (isLoggedIn && user) ? [
        { label: "Mein Account", path: ROUTES.USER.SETTINGS.func(user.id) },
        { label: "Logout", path: ROUTES.HOME.func() }
    ] : [];

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
                    backgroundColor: tokens.color.surfaceContainerLow,
                    color: tokens.color.onSurface,
                    height: 80,
                    boxShadow: "none",
                    borderBottom: `1px solid rgba(69,70,77,0.15)`,
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
                    <ProfileComponent menuElements={menuElements}/>
                    </>
                    :
                    <Button
                        variant={"outlined"}
                        sx={{
                            color: tokens.color.primary,
                            borderColor: tokens.color.primary,
                            "&:hover": {
                                borderColor: tokens.color.onPrimaryContainer,
                                backgroundColor: `${tokens.color.primaryContainer}33`,
                            },
                        }}
                        onClick={loginButton}
                    >
                        Login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    )
}