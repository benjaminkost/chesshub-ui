import {Box, Paper} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {AddClubToAffiliation} from "@/components/TableSearchAndAddButton";
import { ClubAffiliation, ClubMemberStatus, ClubSimple } from "@benaurel/chesshub-core-client";
import {tokens} from "@/styles/theme";

interface ClubsTableProps {
    allClubs: ClubSimple[];
    clubsOfUser: ClubAffiliation[];
}

const parseMemberStatus = (memberStatus: ClubMemberStatus): string => {
    switch (memberStatus) {
        case ClubMemberStatus.Applicant:
            return "Bewerber";
        case ClubMemberStatus.Member:
            return "Mitglied";
        case ClubMemberStatus.FormerMember:
            return "Ehemaliges Mitglied";
        case ClubMemberStatus.Banned:
            return "Gesperrt";
        default:
            return "Unbekannt";
    }
};

const getMemberStatusColor = (status: ClubMemberStatus): string => {
    switch (status) {
        case ClubMemberStatus.Applicant: return tokens.color.secondary;     // cool slate
        case ClubMemberStatus.Member:    return tokens.color.tertiary;       // emerald — "correct" / approved
        case ClubMemberStatus.FormerMember: return tokens.color.onSurfaceVariant;
        case ClubMemberStatus.Banned:    return tokens.color.error;
        default: return tokens.color.onSurfaceVariant;
    }
};

const clubsTableColumns: GridColDef[] = [
    {field: "id", headerName: "ID", resizable: false, flex: 1},
    {field: "name", headerName: "Vereinsname", resizable: false, flex: 2},
    {field: "address", headerName: "Adresse", resizable: false, flex: 3},
    {field: "status", headerName: "Mitgliedsstatus", resizable: false, flex: 1,
        renderCell: (params) => {
        const status = params.value as ClubMemberStatus;

        return (
            <Box sx={{ color: getMemberStatusColor(status), fontWeight: 500 }}>
                {parseMemberStatus(status)}
            </Box>
        );
        }
    }
];

export default function ClubsTable({allClubs, clubsOfUser}: ClubsTableProps) {
    const [currentClubs, setCurrentClubs] = React.useState<ClubAffiliation[]>(clubsOfUser);

    const addClubToUser = (newClub: ClubSimple | null | undefined) => {
        if (newClub){
            // Note: Temporary fallback as joining clubs API is not yet available
            const newClubAffiliation: ClubAffiliation = {
                id: newClub.id,
                name: newClub.name,
                status: ClubMemberStatus.Applicant,
                adminId: newClub.adminId
            };
            setCurrentClubs([...currentClubs, newClubAffiliation]);
        } else {
            console.warn("Selected club was null or undefined");
        }
    };

    return (
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
                columns={clubsTableColumns}
                rows={currentClubs}
                slots={{
                    footer: () => <AddClubToAffiliation
                        allClubs={allClubs}
                        clubsOfUser={currentClubs}
                        addClubToUser={addClubToUser}/>
                }}
            />
        </Paper>
    );
}