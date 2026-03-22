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

interface AddTeamPopupDialogProps {
    allUsers: User[];
    addTeam: (team: Team) => void;
    currentCountOfRows: number;
}

export function AddTeamPopupDialog({allUsers,addTeam,currentCountOfRows}:AddTeamPopupDialogProps) {
    const [clicked, setClicked] = React.useState<boolean>(false);
    const open = clicked;
    const [name, setName] = React.useState<string>();
    const [admin, setAdmin] = React.useState<User | null>();
    const addTeamButton = (typeof name === "string" && typeof admin === "object") ?
            <Button onClick={() => {
                setClicked(false);
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

    return (
        <GridFooterContainer
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
        {
            clicked ?
                <>
                    <Dialog
                        open={open}
                        fullWidth
                        maxWidth={"md"}
                    >
                        <DialogTitle sx={{borderBottom: 1, borderColor: "darkgray", mb: 2}}>Neue Mannschaft erstellen</DialogTitle>
                        <DialogContent
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
            <IconButton>
                <AddIcon onClick={() => setClicked(true)}/>
            </IconButton>
        }
        </GridFooterContainer>
    );
}