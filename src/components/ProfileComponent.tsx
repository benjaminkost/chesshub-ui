import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";

interface ProfileProps {
    menuElements: string[];
}

function ProfileComponent( {menuElements}:ProfileProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
                        <MenuItem key={index} onClick={handleClose}>{menuElement}</MenuItem>
                    ))
                }
            </Menu>
        </Box>
    )
}

export default ProfileComponent;