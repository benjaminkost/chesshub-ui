import {Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useNavigate} from "react-router-dom";
import {NavItem} from "@/types/viewmodels/navigation.vm";
import {tokens} from "@/styles/theme";

export interface MenuButtonProps{
    navItems: NavItem[];
}

export function MenuButton({navItems}:MenuButtonProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <>
            <IconButton
                id={"menuButton"}
                aria-label={"menu"}
                sx={{
                    mr: 2,
                    color: tokens.color.onSurface,
                    transition: `color ${tokens.transition.base}`,
                    "&:hover": { color: tokens.color.primary },
                }}
                onClick={toggleDrawer}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleDrawer}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiDrawer-paper": {
                        backgroundColor: tokens.color.surfaceContainer,
                        color: tokens.color.onSurface,
                    },
                }}
            >
                <Box sx={{display: 'flex'}}>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{ color: tokens.color.onSurfaceVariant }}
                    >
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
    drawerElements: NavItem[];
    onItemClick: () => void;
}

function DrawerList({drawerElements, onItemClick}:DrawerList) {
    const navigate = useNavigate();

    const handleNav = (path:string) => {
        navigate(path);
        onItemClick();
    }

    return (
            <List sx={{ width: 300 }}>
                {drawerElements?.map((elem, index) => (
                    <ListItem key={index} sx={{
                        borderRadius: tokens.radius.md,
                        mb: 0.5,
                        transition: `background-color ${tokens.transition.base}`,
                        "&:hover": { backgroundColor: tokens.color.surfaceBright },
                    }}>
                        {elem.icon && <ListItemIcon sx={{ color: tokens.color.primary }}>{elem.icon}</ListItemIcon>}
                        <ListItemButton
                            onClick={() => handleNav(elem.path)}
                            sx={{ color: tokens.color.onSurface }}
                        >
                            <ListItemText primary={elem.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>);
}