import {Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useNavigate} from "react-router-dom";
import {NavItem} from "@/types/viewmodels/navigation.vm";

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