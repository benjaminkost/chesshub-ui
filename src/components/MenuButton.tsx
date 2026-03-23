import {Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from '@mui/icons-material/History';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DescriptionIcon from '@mui/icons-material/Description';

export interface NavItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

export interface MenuButtonProps{
    navItems?: NavItem[];
}

export const defaultNavItems: NavItem[] = [
    {label: "Partie erstellen", path: "/", icon: <AddIcon/>},
    {label: "Eigene Partien", path: "/ownGamesHistory", icon: <HistoryIcon />},
    {label: "Mannschaftspartien", path: "/teamGamesHistory", icon: <Diversity3Icon/>},
    {label: "Vereinszugehörigkeit", path: "/club-affiliation", icon:< OtherHousesIcon/> },
    {label: "Vereinsverwaltung", path: "/club-management", icon: <ManageSearchIcon/>},
    {label: "Mannschaftsverwaltung", path: "/team-management", icon: <DescriptionIcon/>}
];

export default function MenuButton({navItems=defaultNavItems}:MenuButtonProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <>
            <IconButton
                id={"menuButton"}
                aria-label={"menu"}
                color={"inherit"}
                sx={{mr: 2 }}
                onClick={toggleDrawer}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleDrawer}
                sx={{display: "flex", flexDirection: "column"}}
            >
                <Box sx={{display: 'flex'}}>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton
                        onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider/>
                <DrawerList
                    drawerElements={navItems}
                    onItemClick={toggleDrawer}
                />
            </Drawer>
        </>
    );
}

interface DrawerList{
    drawerElements?: NavItem[];
    onItemClick: () => void;
}

function DrawerList({drawerElements=defaultNavItems, onItemClick}:DrawerList) {
    const navigate = useNavigate();

    const handleNav = (path:string) => {
        navigate(path);
        onItemClick();
    }

    return (
            <List sx={{width: 300}}>
                {drawerElements?.map((elem, index) => (
                    <ListItem key={index}>
                        {elem.icon && <ListItemIcon>{elem.icon}</ListItemIcon>}
                        <ListItemButton
                            onClick={() => handleNav(elem.path)}
                        >
                            <ListItemText primary={elem.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>);
}