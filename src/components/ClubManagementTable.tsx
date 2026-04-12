import {Box, Grid, Paper, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {useNavigate} from "react-router-dom";
import {AddTeamPopupDialog} from "@/components/AddTeamPopupDialog";
import {useLookup} from "@/context/LookupContext";
import {ROUTES} from "@/routes";
import { Club, TeamSimple } from "@benaurel/chesshub-core-client";

interface ClubManagementTableProps {
    club: Club & { teams: TeamSimple[] };
}

export default function ClubManagementTable({club}: ClubManagementTableProps){
    const [rows, setRows] = React.useState<TeamSimple[]>(club?.teams || []);
    const allUsers = Object.values(useLookup().usersSimple);
    const navigate = useNavigate();

    const addTeam = (newTeam: Partial<TeamSimple>) => {
        // Since the backend currently lacks a POST endpoint for teams, 
        // we add it to the local state for now for UI feedback.
        const teamWithId = {
            ...newTeam,
            id: Math.max(0, ...rows.map(r => r.id)) + 1,
            clubName: club.name
        } as TeamSimple;
        
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
                    sx={{"&:hover":
                            {
                                color: "blue",
                                cursor: "pointer"}
                        }
                    }
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
                flexDirection: "column"
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
                    backgroundColor: "gray",
                    color: "white"
                }}
            >
                <Grid container>
                    <Grid size={6}>
                        <Typography sx={{fontWeight: "bold"}}>Vereins-ID:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography>{club.id}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{fontWeight: "bold"}}>Vereinsname:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography>{club.name}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{fontWeight: "bold"}}>Adresse:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography>{club.address}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{m:2}}>
                <DataGrid
                    sx={{
                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: "gray",
                            color: "white"
                        }
                    }}
                    columns={columns}
                    rows={rows}
                    slots={{
                        footer: () => <AddTeamPopupDialog
                                                allUsers={allUsers as any}
                                                addTeam={addTeam as any}
                                                currentHighestID={rows.length > 0 ? Math.max(...rows.map(r => Number(r.id))) : 0}
                        />
                    }}
                />
            </Paper>
        </Box>
    )
}