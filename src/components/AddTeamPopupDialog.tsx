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

interface AddTeamPopupDialogProps {
    allUsers: User[];
    addTeam: (team: Team) => void;
    currentCountOfRows: number;
}

export function AddTeamPopupDialog({allUsers,addTeam,currentCountOfRows}:AddTeamPopupDialogProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>();
    const [admin, setAdmin] = React.useState<User | null>();
    const addTeamButton = (typeof name === "string" && typeof admin === "object") ?
            <Button onClick={() => {
                setOpen(false);
                addTeam({id: currentCountOfRows+1, name: name, admin: admin});
            }}
                    sx={{
                        backgroundColor: "gray",
                        color: "white",
                        m: 1
            }}>
                Hinzufügen
            </Button>
        :
            <Button sx={{
                backgroundColor: "#cfcfcf",
                color: "white"
            }}>
                Hinzufügen
            </Button>

    const nameInput = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setName(event.target.value);
    }

    const closePopUp = () => {
        setOpen(false);
    }

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
                            onClick={closePopUp}
                            sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}>
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
                            {addTeamButton}
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