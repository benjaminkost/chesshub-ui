import {Box, Paper} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {ClubTeams} from "@/types/club";
import {Team} from "@/types/team";
import {Member} from "@/types/user";
import {useNavigate} from "react-router-dom";

interface ClubManagementTable{
    club: ClubTeams;
}

export default function ClubManagementTable({club}: ClubManagementTable){
    const [rows, setRows] = React.useState<Team[]>(club.teams);
    const navigate = useNavigate();

    const navigateToTeam = () => {
        navigate("/team-management");
    };

    const columns = React.useMemo<GridColDef[]>(() => [
        {field: "id", headerName: "ID", resizable: false, flex: 1},
        {field: "name", headerName: "Mannschaft", resizable: false, flex: 3, renderCell: (params) => {
            return (<Box sx={{"&:hover": {color: "blue", cursor: "pointer"}}} onClick={navigateToTeam}>{params.value}</Box>)
            }},
        {field: "admin", headerName: "Mannschaftsleiter", resizable: false, flex: 3, valueFormatter: (value:Member, row) => value.name
        }
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
            />
        </Paper>
    )
}