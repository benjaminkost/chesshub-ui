import React from 'react';
import { Stack, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {MemberRole} from "./TeamManagementTable.js";

interface MemberRoleManagerProps {
    rolesOfUser: MemberRole[];
    onAddRole: (role: MemberRole) => void;
    onDeleteRole: (role: MemberRole) => void;
    cssForMemberRole: (role: MemberRole) => {}
}

export default function MemberRoleManager ({rolesOfUser, onAddRole, onDeleteRole, cssForMemberRole}:MemberRoleManagerProps){
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const allPossibleRoles = Object.values(MemberRole);
    const rolesUserDoesNotHave = allPossibleRoles.filter(
        (role) => !rolesOfUser.includes(role)
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: 1 }}>
            {rolesOfUser.map((role) => (
                <Chip
                    key={role}
                    label={role}
                    size="small"
                    sx={cssForMemberRole(role)}
                    onDelete={() => onDeleteRole(role)}
                />
            ))}

            {/* Plus-Button nur zeigen, wenn es noch Rollen zum Hinzufügen gibt */}
            {rolesUserDoesNotHave.length > 0 && (
                <>
                    <IconButton size="small" onClick={handleClick} color="primary">
                        <AddCircleOutlineIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        {rolesUserDoesNotHave.map((role) => (
                            <MenuItem
                                key={role}
                                onClick={() => { onAddRole(role); handleClose(); }}
                            >
                                {role}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Stack>
    );
};