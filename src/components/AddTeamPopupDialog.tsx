import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React from "react";
import { UserSimple } from "@benaurel/chesshub-core-client";
import {TeamVm} from "@/types/viewmodels/team.vm";
import {tokens} from "@/styles/theme";

interface AddTeamPopupDialogProps {
    addTeam: (team: Partial<TeamVm>) => void;
    allUsers: UserSimple[];
    currentHighestID: number;
}

export function AddTeamPopupDialog({addTeam, allUsers, currentHighestID}: AddTeamPopupDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [teamName, setTeamName] = React.useState("");
    const [admin, setAdmin] = React.useState<UserSimple | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTeamName("");
        setAdmin(null);
    };

    const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(event.target.value);
    };

    const handleAdminChange = (event: SelectChangeEvent<string>) => {
        const selectedId = Number(event.target.value);
        const selectedUser = allUsers.find(u => u.id === selectedId);
        setAdmin(selectedUser || null);
    };

    const handleSave = () => {
        if (!teamName || !admin) return;

        const newTeam: Partial<TeamVm> = {
            id: currentHighestID + 1,
            name: teamName,
            adminId: admin.id,
            adminName: admin.name
        };

        addTeam(newTeam);
        handleClose();
    };

    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                sx={{
                    m: 2,
                    background: tokens.gradient.primaryCta,
                    color: tokens.color.onPrimary,
                    borderRadius: tokens.radius.md,
                    letterSpacing: "0.05em",
                    "&:hover": { filter: "brightness(1.1)" },
                }}
            >
                Mannschaft hinzufügen
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>Neue Mannschaft erstellen</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 1,
                            minWidth: 300,
                        }}
                    >
                        <TextField
                            label="Mannschaftsname"
                            variant="outlined"
                            fullWidth
                            value={teamName}
                            onChange={handleTeamNameChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="admin-select-label">Mannschaftsleiter</InputLabel>
                            <Select
                                labelId="admin-select-label"
                                value={admin?.id?.toString() || ""}
                                label="Mannschaftsleiter"
                                onChange={handleAdminChange}
                            >
                                {allUsers.map((user) => (
                                    <MenuItem key={user.id} value={user.id?.toString()}>
                                        {user.name} ({user.userName})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{ color: tokens.color.onSurfaceVariant }}
                    >Abbrechen</Button>
                    <Button 
                        onClick={handleSave} 
                        disabled={!teamName || !admin}
                        variant="contained"
                        sx={{
                            background: teamName && admin ? tokens.gradient.primaryCta : tokens.color.surfaceContainerHighest,
                            color: teamName && admin ? tokens.color.onPrimary : tokens.color.onSurfaceVariant,
                            borderRadius: tokens.radius.md,
                            "&:hover": { filter: "brightness(1.1)" },
                        }}
                    >
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}