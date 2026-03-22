import {Box, Paper} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {ClubTeams} from "@/types/club";
import {Team} from "@/types/team";
import {Member, User} from "@/types/user";
import {useNavigate} from "react-router-dom";
import {AddTeamPopupDialog} from "@/components/AddTeamPopupDialog";

interface ClubManagementTable{
    club: ClubTeams;
    allUsers: User[];
}

export default function ClubManagementTable({club, allUsers}: ClubManagementTable){
    const [rows, setRows] = React.useState<Team[]>(club.teams);
    const navigate = useNavigate();

    const addTeam = (newTeam:Team) => {
        setRows((prevState) => [...prevState, newTeam]);
    }

    const navigateToTeam = () => {
        navigate("/team-management");
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
                    onClick={navigateToTeam}>
                    {params.value}
                </Box>)
            }},
        {field: "admin", headerName: "Mannschaftsleiter", resizable: false, flex: 3, valueFormatter: (value:Member, row) => value.name}
    ],[rows]);

    return (
        <Paper
            sx={{
                m: 2
            }}
        >
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
                    footer: () => < AddTeamPopupDialog
                                                        allUsers={allUsers}
                                                       addTeam={addTeam}
                                                       currentCountOfRows={rows.length}/>
                }}
            />
        </Paper>
    )
}