import {Box, Grid, Paper, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {useNavigate} from "react-router-dom";
import {AddTeamPopupDialog} from "@/components/AddTeamPopupDialog";
import {useLookup} from "@/context/LookupContext";
import {ROUTES} from "@/routes";
import {TeamVm} from "@/types/viewmodels/team.vm";
import {ClubVm} from "@/types/viewmodels/club.vm";
import {tokens} from "@/styles/theme";

interface ClubManagementTableProps {
    club: ClubVm & { teams: TeamVm[] };
}

export default function ClubManagementTable({club}: ClubManagementTableProps){
    const [rows, setRows] = React.useState<TeamVm[]>(club?.teams || []);
    const allUsers = Object.values(useLookup().usersSimple);
    const navigate = useNavigate();

    const addTeam = (newTeam: Partial<TeamVm>) => {
        // Since the backend currently lacks a POST endpoint for teams, 
        // we add it to the local state for now for UI feedback.

        const teamWithId = {
            ...newTeam,
            id: Math.max(0, ...rows.map(r => r.id)) + 1,
            clubName: club.name,
        } as TeamVm;
        
        setRows((prevState) => [...prevState, teamWithId]);
        console.warn("Team addition requested, but backend persistence is missing in OpenAPI.");
    }

    const navigateToTeam = (teamId: number) => {
        navigate(ROUTES.TEAMS.MANAGE.func(teamId));
    };

    const columns = React.useMemo<GridColDef[]>(() => [
        {field: "id", headerName: "ID", resizable: false, flex: 1},
        {field: "name", headerName: "Mannschaft", resizable: false, flex: 3, renderCell: (params) => {
            return (
                <Box
                    sx={{
                        color: tokens.color.primary,
                        transition: `color ${tokens.transition.base}`,
                        "&:hover": {
                            color: tokens.color.onPrimaryContainer,
                            cursor: "pointer",
                        }
                    }}
                    onClick={() => navigateToTeam(params.row.id)}>
                    {params.value}
                </Box>)
            }},
        {field: "adminName", headerName: "Mannschaftsleiter", resizable: false, flex: 3}
    ],[rows]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Paper
                sx={{
                    m: 2,
                    p: 2,
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    backgroundColor: tokens.color.surfaceContainerHigh,
                    color: tokens.color.onSurface,
                    borderRadius: tokens.radius.lg,
                    boxShadow: tokens.shadow.cardLift,
                }}
            >
                <Grid container>
                    <Grid size={6}>
                        <Typography sx={{ fontWeight: "bold", color: tokens.color.onSurfaceVariant, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Vereins-ID:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{ color: tokens.color.onSurface }}>{club.id}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{ fontWeight: "bold", color: tokens.color.onSurfaceVariant, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Vereinsname:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{ color: tokens.color.onSurface }}>{club.name}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{ fontWeight: "bold", color: tokens.color.onSurfaceVariant, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Adresse:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{ color: tokens.color.onSurface }}>{club.address}</Typography>
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
                    rows={rows}
                    slots={{
                        footer: () => {
                            const maxId = rows.length > 0 ? Math.max(...rows.map(r => Number(r.id))) : 0;
                            return (
                                <AddTeamPopupDialog
                                    allUsers={allUsers as any}
                                    addTeam={addTeam as any}
                                    currentHighestID={maxId}
                                />
                            );
                        }
                    }}
                />
            </Paper>
        </Box>
    )
}