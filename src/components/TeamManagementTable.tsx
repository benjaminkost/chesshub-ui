import {Alert, Grid, Paper, Snackbar, SnackbarCloseReason, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import React from "react";
import {AddUserToTeamSearchBar} from "@/components/TableSearchAndAddButton";
import {useNavigate} from "react-router-dom";
import {TeamMember, TeamRole, UserSimple} from "@benaurel/chesshub-core-client";
import {ROUTES} from "@/routes";
import TeamMemberRoleManager from "@/components/TeamMemberRoleManager";
import {mapUserSimpleVmToTeamMember} from "@/api/mappers/user.mapper";
import {TeamVm} from "@/types/viewmodels/team.vm";

interface TeamManagementTableProps {
    team: TeamVm;
}

const cssForMemberRole = (role: TeamRole) => {
    switch (role) {
        case TeamRole.DeputyAdmin:
            return { backgroundColor: "red", color: "white" };
        case TeamRole.HeadCoach:
            return { backgroundColor: "orange", color: "white" };
        case TeamRole.Captain:
            return { backgroundColor: "purple", color: "white" };
        case TeamRole.Player:
            return { backgroundColor: "blue", color: "white" };
        case TeamRole.Reserve:
            return { backgroundColor: "lightblue", color: "white" };
        default:
            return { backgroundColor: "black", color: "white" };
    }
}

export default function TeamManagementTable({team}: TeamManagementTableProps) {
    const [currentMembers, setCurrentMembers] = React.useState<TeamMember[]>(team.members ?? []);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const addUserToTeam = (selectedUser: UserSimple | null) => {
        if (!selectedUser) return;
        const memberToAdd: TeamMember = mapUserSimpleVmToTeamMember(selectedUser, [TeamRole.Player]);
        setCurrentMembers([...currentMembers, memberToAdd]);
    };

    const addRole = (rowId: GridRowId, role: TeamRole) => {
        setCurrentMembers(prev => prev.map(m => m.id === rowId ? {...m, roles: [...(m.roles ?? []), role]} : m));
    };

    const deleteRole = (rowId: GridRowId, role: TeamRole) => {
        if (role === TeamRole.DeputyAdmin) {
            const adminCount = currentMembers.filter((m) => m.roles.includes(TeamRole.DeputyAdmin)).length;
            if (adminCount === 1){
                setOpenSnackbar(true);
                return;
            }
        }
        setCurrentMembers((prev) =>
            prev.map((m) =>
                m.id === rowId ? {...m, roles: m.roles.filter(r => r !== role)} : m
            )
        );
    };

    const handleClose =  (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    }

    const columns = React.useMemo<GridColDef[]>(() => [
        {field: "id", headerName: "ID", resizable: false, flex: 1},
        {field: "name", headerName: "Spielername", resizable: false, flex: 4},
        {
            field: "roles", headerName: "Rollen", resizable: false, flex: 6,
            renderCell: (params) => (
                <TeamMemberRoleManager
                    rolesOfUser={params.value as TeamRole[]}
                    onAddRole={(role) => addRole(params.id, role)}
                    onDeleteRole={(role) => deleteRole(params.id, role)}
                    cssForMemberRole={cssForMemberRole}
                />
            )
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
                <Alert severity={"warning"} sx={{ border: "solid 1px", borderColor: "orange", backgroundColor: 'hsl(39, 100%, 60%)', color: "white" }}>
                    Es muss mindestens einen Admin geben
                </Alert>
            </Snackbar>
            <Paper
                sx={{
                    m: 2, p: 2, width: "fit-content", display: "flex", flexDirection: "row", gap: 2,
                    backgroundColor: "gray", color: "white"
                }}
            >
                <Grid container>
                    <Grid size={6}><Typography sx={{fontWeight: "bold"}}>Mannschafts-ID:</Typography></Grid>
                    <Grid size={6}><Typography>{team.id}</Typography></Grid>
                    <Grid size={6}><Typography sx={{fontWeight: "bold"}}>Mannschaftsname:</Typography></Grid>
                    <Grid size={6}><Typography>{team.name}</Typography></Grid>
                    <Grid size={6}><Typography sx={{fontWeight: "bold"}}>Verein:</Typography></Grid>
                    <Grid size={6} onClick={() => navigate(ROUTES.CLUBS.MANAGE.func(team.clubId!))}
                          sx={{"&:hover": {color: "blue", cursor: "pointer"}}}>
                        <Typography>{team.clubName}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ m: 2 }}>
                <DataGrid
                    autoHeight
                    sx={{ "& .MuiDataGrid-columnHeader": { backgroundColor: "gray", color: "white" } }}
                    columns={columns}
                    rows={currentMembers}
                    slots={{
                        footer: () => <AddUserToTeamSearchBar
                            membersInTeam={currentMembers}
                            addUserToTeam={addUserToTeam}/>
                    }}
                    getRowHeight={() => 'auto'}
                />
            </Paper>
        </>
    );
}