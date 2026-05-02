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
import {tokens} from "@/styles/theme";

interface TeamManagementTableProps {
    team: TeamVm;
}

/** Role badge colours mapped to design tokens */
const cssForMemberRole = (role: TeamRole): { backgroundColor: string; color: string } => {
    switch (role) {
        case TeamRole.DeputyAdmin:
            return { backgroundColor: tokens.color.error, color: tokens.color.onError };
        case TeamRole.HeadCoach:
            return { backgroundColor: tokens.color.secondary, color: tokens.color.onSecondary };
        case TeamRole.Captain:
            return { backgroundColor: tokens.color.primaryContainer, color: tokens.color.onPrimaryContainer };
        case TeamRole.Player:
            return { backgroundColor: tokens.color.primary, color: tokens.color.onPrimary };
        case TeamRole.Reserve:
            return { backgroundColor: tokens.color.surfaceVariant, color: tokens.color.onSurface };
        default:
            return { backgroundColor: tokens.color.surfaceContainerHigh, color: tokens.color.onSurface };
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
                <Alert severity={"warning"} sx={{
                    backgroundColor: tokens.color.surfaceContainerHigh,
                    color: tokens.color.secondary,
                    border: `1px solid ${tokens.color.secondary}`,
                }}>
                    Es muss mindestens einen Admin geben
                </Alert>
            </Snackbar>
            <Paper
                sx={{
                    m: 2, p: 2, width: "fit-content", display: "flex", flexDirection: "row", gap: 2,
                    backgroundColor: tokens.color.surfaceContainerHigh,
                    color: tokens.color.onSurface,
                    borderRadius: tokens.radius.lg,
                    boxShadow: tokens.shadow.cardLift,
                }}
            >
                <Grid container>
                    <Grid size={6}><Typography sx={{ fontWeight: "bold", color: tokens.color.onSurfaceVariant, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Mannschafts-ID:</Typography></Grid>
                    <Grid size={6}><Typography sx={{ color: tokens.color.onSurface }}>{team.id}</Typography></Grid>
                    <Grid size={6}><Typography sx={{ fontWeight: "bold", color: tokens.color.onSurfaceVariant, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Mannschaftsname:</Typography></Grid>
                    <Grid size={6}><Typography sx={{ color: tokens.color.onSurface }}>{team.name}</Typography></Grid>
                    <Grid size={6}><Typography sx={{ fontWeight: "bold", color: tokens.color.onSurfaceVariant, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Verein:</Typography></Grid>
                    <Grid size={6} onClick={() => navigate(ROUTES.CLUBS.MANAGE.func(team.clubId!))}
                          sx={{
                              color: tokens.color.primary,
                              transition: `color ${tokens.transition.base}`,
                              "&:hover": { color: tokens.color.onPrimaryContainer, cursor: "pointer" },
                          }}>
                        <Typography>{team.clubName}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{ m: 2, backgroundColor: tokens.color.surfaceContainer }}>
                <DataGrid
                    autoHeight
                    sx={{
                        color: tokens.color.onSurface,
                        border: "none",
                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: tokens.color.surfaceContainerLow,
                            color: tokens.color.onSurfaceVariant,
                            fontFamily: tokens.font.body,
                            letterSpacing: "0.05em",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                        },
                        "& .MuiDataGrid-row:hover": { backgroundColor: tokens.color.surfaceBright },
                        "& .MuiDataGrid-cell": { borderColor: `rgba(69,70,77,0.15)` },
                        "& .MuiDataGrid-footerContainer": { backgroundColor: tokens.color.surfaceContainerLow, borderColor: `rgba(69,70,77,0.15)` },
                        "& .MuiTablePagination-root": { color: tokens.color.onSurfaceVariant },
                    }}
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