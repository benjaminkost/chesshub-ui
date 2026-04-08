import { Paper } from "@mui/material";
import React from "react";
import {DataGrid, GridColDef, GridColumnVisibilityModel} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {Dayjs} from "dayjs";
import {GameWithTeamVm} from "@/types/viewmodels/game.vm";

interface GameTableProps {
    games: GameWithTeamVm[],
    ownGamesOrTeamGames?: boolean
}

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", resizable: false, flex: 0.75 },
    { field: "whitePlayerName", headerName: "Weiß", resizable: false, flex: 2 },
    { field: "blackPlayerName", headerName: "Schwarz", resizable: false, flex: 2 },
    { field: "teamName", headerName: "Mannschaft", resizable: false, flex: 2 },
    { field: "date", headerName: "Datum", type: "date", resizable: false, flex: 1.5,
        valueFormatter: (value:Dayjs) => value?.format("DD.MM.YYYY")
    },
    { field: "opening", headerName: "Eröffnung", resizable: false, flex: 2 },
    { field: "moves", headerName: "Züge", resizable: false, flex: 5 }
];

export function GamesTable({games, ownGamesOrTeamGames=true}: GameTableProps){
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({});
    const navigate = useNavigate();

    React.useEffect(() => {
        if (ownGamesOrTeamGames){
            setColumnVisibilityModel({team: true});
        } else {
            setColumnVisibilityModel({team: false});
        }
    },[ownGamesOrTeamGames]);

    const handleRowClick = () => {
        navigate("/view-game");
    }

    return(
        <Paper
            sx={{
                m: 3,
                maxWidth: "100%"
            }}
        >
            <DataGrid
                sx={{
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: 'gray',
                        color: "white"
                    },
                    '& .MuiDataGrid-filler': {
                        backgroundColor: 'gray!important',
                    }
                }}
                columnVisibilityModel={columnVisibilityModel}
                columns={columns}
                rows={games}
                onRowClick={handleRowClick}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    }
                }}
                pageSizeOptions={[1,5,10,25,100]}
                disableRowSelectionOnClick
            />
        </Paper>
    )
}