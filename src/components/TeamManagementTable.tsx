import {
    Alert,
    Box,
    Paper,
    Snackbar,
    SnackbarCloseReason,
    Typography
} from "@mui/material";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import React from "react";
import MemberRoleManager from "./MemberRoleManager.js";
import {Team} from "@/types/team";
import {Member, MemberRole} from "@/types/user.js";
import {AddUserToTeamSearchBar} from "@/components/TableSearchAndAddButton";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

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
                    <Typography onClick={() => navigate("/club-management")}
                                sx={{
                                    "&:hover":
                                        {color: "blue", cursor: "pointer"}
                                }}>
                        {team.club.name}
                    </Typography>
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