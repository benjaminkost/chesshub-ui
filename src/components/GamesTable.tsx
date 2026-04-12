import { Paper } from "@mui/material";
import React from "react";
import {DataGrid, GridColDef, GridColumnVisibilityModel} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import { Game } from "@benaurel/chesshub-core-client";
import { ROUTES } from "@/routes";

interface GameTableProps {
    rows: Game[],
    ownGamesOrTeamGames: boolean
}

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", resizable: false, flex: 0.75 },
    { field: "whitePlayerName", headerName: "Weiß", resizable: false, flex: 2 },
    { field: "blackPlayerName", headerName: "Schwarz", resizable: false, flex: 2 },
    { field: "teamName", headerName: "Mannschaft", resizable: false, flex: 2 },
    { field: "date", headerName: "Datum", type: "date", resizable: false, flex: 1.5,
        valueGetter: (value: string) => value ? dayjs(value).toDate() : null,
        valueFormatter: (value: Date) => value ? dayjs(value).format("DD.MM.YYYY") : ""
    },
    { field: "opening", headerName: "Eröffnung", resizable: false, flex: 2 },
    { field: "moves", headerName: "Züge", resizable: false, flex: 5 }
];

export function GamesTable({rows, ownGamesOrTeamGames}: GameTableProps){
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({});
    const navigate = useNavigate();

    React.useEffect(() => {
        setColumnVisibilityModel({
            teamName: ownGamesOrTeamGames
        });
    }, [ownGamesOrTeamGames]);

    const handleRowClick = (params: any) => {
        navigate(ROUTES.GAMES.VIEW.func(params.id));
    }

    return(
        <Paper sx={{ m: 3, maxWidth: "100%" }}>
            <DataGrid
                sx={{
                    '& .MuiDataGrid-columnHeader': { backgroundColor: 'gray', color: "white" },
                    '& .MuiDataGrid-filler': { backgroundColor: 'gray!important' },
                    '& .MuiDataGrid-virtualScrollerContent': {
                        '&:hover': { color: "blue", cursor: "pointer" }
                    }
                }}
                columnVisibilityModel={columnVisibilityModel}
                columns={columns}
                rows={rows}
                onRowClick={handleRowClick}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } }
                }}
                pageSizeOptions={[1,5,10,25,100]}
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
            />
        </Paper>
    )
}