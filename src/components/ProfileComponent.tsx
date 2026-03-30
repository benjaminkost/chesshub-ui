import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import {useNavigate} from "react-router-dom";

interface MenuElement {
    label: string,
    path: string
    action?: () => void;
}

export interface ProfileProps {
    menuElements?: MenuElement[];
}

export const defaultMenuElements = [
    { label: "Mein Account", path: "/profile-settings"},
    { label: "Logout", path: "/"}
];

function ProfileComponent( {menuElements=defaultMenuElements}:ProfileProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleSelect = (selectedOption:string) => {
       navigate(selectedOption);

        handleClose();
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton
                id={"profile-icon-button"}
                color={"inherit"}
                aria-label={"account of current user"}
                onClick={handleClick}
            >
            <AccountCircleIcon color={"inherit"} />
            </IconButton>
            <Menu
                id={"dropdown-profile-menu"}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                {
                    menuElements.map((menuElement, index) => (
                        <MenuItem key={index} onClick={() => handleSelect(menuElement.path)}>{menuElement.label}</MenuItem>
                    ))
                }
            </Menu>
        </Box>
    )
}

export default ProfileComponent;