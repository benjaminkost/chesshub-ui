import {Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useNavigate} from "react-router";

interface MenuButtonProps{
    drawerElements?: string[];
}

export const defaultDrawerElements = ["Partie erstellen", "Eigene Partien", "Mannschaftspartien"];

export default function MenuButton({drawerElements=defaultDrawerElements}:MenuButtonProps) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    }

    const openPage = (name:string) => {
        switch(name) {
            case "Partie erstellen":
                break;
            case "Eigene Partien":
                navigate("/ownGamesHistory");
                break;
            case "Mannschaftspartien":
                navigate("/teamGamesHistory")
                break;
        }
    }

    const drawerHTMLElements = (
      <Box sx={{ width: 200}}>
          <List>
              {drawerElements?.map((elem, index) => (
            <ListItem key={index}>
                <ListItemButton
                    onClick={() => openPage(elem)} // TODO: Button basiert die navigation definieren (wie kann man ein input bei einer Button Funktion definieren)
                >
                    <ListItemText primary={elem}/>
                </ListItemButton>
            </ListItem>
          ))}
          </List>
      </Box>
    );



    return (
        <>
            <IconButton
                id={"menuButton"}
                aria-label={"menu"}
                color={"inherit"}
                sx={{mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                <Box sx={{display: 'flex'}}>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton
                        onClick={toggleDrawer(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider/>
                {drawerHTMLElements}
            </Drawer>
        </>
    );
}