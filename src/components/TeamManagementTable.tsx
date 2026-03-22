import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Paper,
    Snackbar,
    SnackbarCloseReason,
    TextField,
    Typography
} from "@mui/material";
import {DataGrid, GridColDef, GridFooterContainer, GridRowId} from "@mui/x-data-grid";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import MemberRoleManager from "./MemberRoleManager.js";
import {Team} from "@/types/team";
import {Member, MemberRole} from "@/types/user.js";

interface TeamManagementTableProps {
    team: Team;
    allUsers: Member[];
}

const cssForMemberRole = (role: MemberRole) => {
    switch (role) {
        case MemberRole.ADMIN:
            return {
                backgroundColor: "red",
                color: "white"
            };
        case MemberRole.HEAD_COACH:
            return {
                backgroundColor: "orange",
                color: "white"
            };
        case MemberRole.CAPTAIN:
            return {
                backgroundColor: "purple",
                color: "white"
            };
        case MemberRole.PLAYER:
            return {
                backgroundColor: "blue",
                color: "white"
            };
        case MemberRole.RESERVE:
            return {
                backgroundColor: "lightblue",
                color: "white"
            };
        default:
            return {
                backgroundColor: "black",
                color: "white"
            }
    }
}

export default function TeamManagementTable({team, allUsers}: TeamManagementTableProps) {
    const [currentMembers, setCurrentMembers] = React.useState<Member[]>(team.members);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>();

    const addUserToTeam = (selectedUser: Member | null) => {
        if (!selectedUser) return;

        const memberToAdd: Member = {
            ...selectedUser,
            roles: [...selectedUser.roles, MemberRole.PLAYER]
        }

        setCurrentMembers([...currentMembers, memberToAdd]);
    };

    const addRole = (rowId: GridRowId, role: MemberRole) => {
        setCurrentMembers(prev => prev.map(m => m.id === rowId ? {...m, roles: [...m.roles, role]} : m));
    };

    const deleteRole = (rowId: GridRowId, role: MemberRole) => {
        if (role === MemberRole.ADMIN) {
            const adminCount = currentMembers.filter((m) => m.roles.includes(MemberRole.ADMIN)).length;

            if (adminCount == 1){
                setOpenSnackbar(true);
                return
            }
        }

        setCurrentMembers((prev) =>
            prev.map((m) =>
                m.id === rowId ?
                    {...m, roles: m.roles.filter(r => r !== role)}
                    :
                    m
            )
        );
    };

    const handleClose =  (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    }

    const clubsTableColumns = React.useMemo<GridColDef[]>(() => [
        {field: "id", headerName: "ID", resizable: false, flex: 1},
        {field: "name", headerName: "Spielername", resizable: false, flex: 4},
        {
            field: "roles", headerName: "Rollen", resizable: false, flex: 6,
            renderCell: (params) => {

                return <MemberRoleManager
                    rolesOfUser={params.value as MemberRole[]}
                    onAddRole={(role) => addRole(params.id, role)}
                    onDeleteRole={(role) => deleteRole(params.id, role)}
                    cssForMemberRole={cssForMemberRole}
                />
            }
        }
    ], [currentMembers]);

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={"warning"}
                    sx={{
                        border: "solid 1px",
                        borderColor: "orange",
                        backgroundColor: 'hsl(39, 100%, 60%)',
                        color: "white"
                    }}
                >
                    There has to be at least one Admin
                </Alert>
            </Snackbar>
            <Paper sx={{display: "flex", flexDirection: "row", m: 2, p: 2, width: "fit-content", backgroundColor: "lightgray"}}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Typography sx={{fontWeight: "bold"}}>Mannschafts-ID:</Typography>
                    <Typography sx={{fontWeight: "bold"}}>Mannschaftsname:</Typography>
                    <Typography sx={{fontWeight: "bold"}}>Verein:</Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", ml: 2}}>
                    <Typography>{team.id}</Typography>
                    <Typography>{team.name}</Typography>
                    <Typography>{team.club.name}</Typography>
                </Box>
            </Paper>
            <Paper
                sx={{
                    m: 2,
                    display: "flex"
                }}
            >
                <DataGrid
                    sx={{
                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: "gray",
                            color: "white"
                        }
                    }}
                    columns={clubsTableColumns}
                    rows={currentMembers}
                    slots={{
                        footer: () => <AddUserToTeamSearchBar
                            allUsers={allUsers}
                            membersInTeam={currentMembers}
                            addUserToTeam={addUserToTeam}/>
                    }}
                    getRowHeight={() => 'auto'}
                />
            </Paper>
        </>
    )
}

interface AddUserToTeamSearchBarProps {
    allUsers: Member[],
    membersInTeam: Member[],
    addUserToTeam: (newMember: Member) => void
}

function AddUserToTeamSearchBar({allUsers, membersInTeam, addUserToTeam}: AddUserToTeamSearchBarProps){
    const [clicked, setClicked] = React.useState(false);
    const membersInTeamIds = new Set(membersInTeam.map((m) => m.id))
    const usersNotApartOfTeam = allUsers.filter((member) => !membersInTeamIds.has(member.id));
    const [selectedUser, setSelectedUser] = React.useState<Member | null>(null);

    const handleOnClick = () => {
        if (selectedUser){
            addUserToTeam(selectedUser);
            setClicked(false);
            setSelectedUser(null);
        }
    }

    return (
        <GridFooterContainer>
            <Box
                sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}
            >
                {
                    clicked ?
                        <>
                            <Autocomplete
                                fullWidth
                                freeSolo
                                options={usersNotApartOfTeam}
                                getOptionLabel={(option:Member | string) => {
                                    return typeof option === 'string' ? option : `${option.name} (${option.id})`
                                }}
                                renderInput={(params) => <TextField{...params}/>}
                                onChange={(event, selectedUser:Member | string | null) => {
                                    typeof selectedUser === 'string' ?
                                        console.log("String was tipped in no User selected")
                                        :
                                        setSelectedUser(selectedUser)
                                }}
                            />
                            <Button
                                sx={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    mr: 1,
                                    ml: 1
                                }}
                                onClick={handleOnClick}
                            >
                                Hinzufügen
                            </Button>
                        </>
                        :
                        <Button
                            startIcon={<AddIcon/>}
                            fullWidth
                            sx={{backgroundColor: "lightgray", color: "white"}}
                            onClick={() => clicked ? setClicked(false) : setClicked(true)}
                        />
                }
            </Box>
        </GridFooterContainer>
    );
}