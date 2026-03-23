import React from "react";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {GridFooterContainer} from "@mui/x-data-grid";
import {User} from "@/types/user";
import {Team} from "@/types/team";
import CloseIcon from '@mui/icons-material/Close';
import {Club} from "@/types/club";

interface AddTeamPopupDialogProps {
    allUsers: User[];
    addTeam: (team: Team) => void;
    currentHighestID: number;
    club: Club;
}

export function AddTeamPopupDialog({allUsers,addTeam,currentHighestID,club}:AddTeamPopupDialogProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>();
    const [admin, setAdmin] = React.useState<User | null>();
    const isFormIncomplete = !name?.trim() || !admin;

    const nameInput = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setName(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
        setAdmin(null);
        setName("");
    };

    const handleAdd = () => {
        if (name && admin){
            addTeam({
                id: (currentHighestID+1),
                name: name,
                admin: admin,
                club: club
            });
            handleClose();
        }
    };

    return (
        <GridFooterContainer
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
        {
            open ?
                <>
                    <Dialog
                        open={open}
                        fullWidth
                        maxWidth={"md"}
                    >
                        <DialogTitle>Neue Mannschaft erstellen</DialogTitle>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8}}
                        >
                            <CloseIcon/>
                        </IconButton>
                        <DialogContent
                            dividers
                            sx={{
                                gap: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <TextField placeholder={"Mannschaftsname"} onInput={nameInput} required/>
                            <Autocomplete
                                getOptionLabel={(option:User | string) => typeof option === 'string' ? option : option.userName}
                                renderInput={(params) => <TextField {...params} placeholder={"Mannschaftsleiter"}/>}
                                options={allUsers}
                                onChange={(event,selectedUser: User | string | null) => {
                                    typeof selectedUser === 'string' ?
                                        console.log("No User was selected")
                                        :
                                        setAdmin(selectedUser)
                                }}
                                aria-placeholder={"Admin"}
                            />
                            <Button
                                onClick={handleAdd}
                                disabled={isFormIncomplete}
                                sx={{
                                    backgroundColor: isFormIncomplete ? "lightgray" : "gray",
                                    color: "white",
                                    m: 1
                                    }}
                            >
                                Hinzufügen
                            </Button>
                        </DialogContent>
                    </Dialog>
                </>
            :
            <Button
                fullWidth
                sx={{backgroundColor: "lightgray", color: "white"}}
                startIcon={<AddIcon/>}
                onClick={() => setOpen(true)}/>
        }
        </GridFooterContainer>
    );
}