import { Paper } from "@mui/material";
import React from "react";
import {DataGrid, GridColDef, GridColumnVisibilityModel} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {Dayjs} from "dayjs";

export interface Row {
    id: number,
    whitePGN: string,
    blackPGN: string,
    datePGN: Dayjs,
    opening: string,
    team: string,
    movePGN: string
}

interface GameTableProps {
    rows: Row[],
    ownGamesOrTeamGames: boolean
}

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", resizable: false, flex: 0.75 },
    { field: "whitePGN", headerName: "Weiß", resizable: false, flex: 2 },
    { field: "blackPGN", headerName: "Schwarz", resizable: false, flex: 2 },
    { field: "team", headerName: "Mannschaft", resizable: false, flex: 2 },
    { field: "datePGN", headerName: "Datum", type: "date", resizable: false, flex: 1.5 },
    { field: "opening", headerName: "Eröffnung", resizable: false, flex: 2 },
    { field: "movePGN", headerName: "Züge", resizable: false, flex: 5 }
];

export function GamesTable({rows, ownGamesOrTeamGames}: GameTableProps){

    const userName = "Benjamin Kostka"; // TODO: muss später mit user daten ausgelesen werden
    const userTeam = "SV Empor"; // TODO: muss später mit user daten ausgelesen werden
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({});
    const navigate = useNavigate();

    React.useEffect(() => {
        if (ownGamesOrTeamGames){
            setColumnVisibilityModel({team: true});
        } else {
            setColumnVisibilityModel({team: false});
        }
    },[ownGamesOrTeamGames]);

    const displayRows = React.useMemo(()=> {
        if (ownGamesOrTeamGames) return rows.filter((elem) =>
            elem.whitePGN == userName || elem.blackPGN == userName);

        return rows;
    }, [rows, ownGamesOrTeamGames, userName]);

    const filterModel = React.useMemo(() => {
        if (ownGamesOrTeamGames) return { items: []};

        return {
            items: [
                {
                    field: 'team',
                    operator: 'equals',
                    value: userTeam
                }
            ]
        };
    },[ownGamesOrTeamGames, userTeam]);

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
                    },
                    '& .MuiDataGrid-virtualScrollerContent': {
                        '&:hover': {
                            color: "blue",
                            cursor: "pointer"
                        }
                    }
                }}
                filterModel={filterModel}
                columnVisibilityModel={columnVisibilityModel}
                columns={columns}
                rows={displayRows}
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