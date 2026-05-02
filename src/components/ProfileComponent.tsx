import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";

import {MenuElement} from "@/types/viewmodels/navigation.vm";
import {authApi} from "@/api/clients/apiChesshubCore";
import {ROUTES} from "@/routes";
import {useNavigate} from "react-router-dom";

export interface ProfileProps {
    menuElements?: MenuElement[];
}

export function ProfileComponent( {menuElements}:ProfileProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleSelect = async (selectedOption: string) => {

        if (selectedOption === ROUTES.HOME.func()){
            await authApi.logout();
            window.location.href = selectedOption;
        } else {
            navigate(selectedOption)
        }

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
                    menuElements && menuElements.map((menuElement, index) => (
                        <MenuItem key={index} onClick={() => handleSelect(menuElement.path)}>{menuElement.label}</MenuItem>
                    ))
                }
            </Menu>
        </Box>
    )
}