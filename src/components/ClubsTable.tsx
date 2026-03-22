import {Box, Paper} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {Club, ClubAffiliation, MemberStatus} from "@/types/club";
import {AddClubToAffiliation} from "@/components/TableSearchAndAddButton";

interface ClubsTableProps {
    allClubs: Club[];
    clubsOfUser: ClubAffiliation[];
}

const parseMemberStatus = (memberStatus: MemberStatus): string => {
    switch (memberStatus) {
        case MemberStatus.APPLICANT:
            return "Bewerber";
        case MemberStatus.MEMBER:
            return "Mitglied";
        case MemberStatus.FORMER_MEMBER:
            return "Ehemaliges Mitglied";
        case MemberStatus.BANNED:
            return "Gesperrt";
        default:
            return "Unbekannt";
    }
};

const clubsTableColumns: GridColDef[] = [
    {field: "id", headerName: "ID", resizable: false, flex: 1},
    {field: "name", headerName: "Vereinsname", resizable: false, flex: 2},
    {field: "address", headerName: "Adresse", resizable: false, flex: 3},
    {field: "president", headerName: "Vorsitzender", resizable: false, flex: 2},
    {field: "status", headerName: "Mitgliedsstatus", resizable: false, flex: 1,
        valueFormatter: (value: MemberStatus) => parseMemberStatus(value),
        renderCell: (params) => {
        const status = params.value as MemberStatus;
        let textColor = "black";

        switch (status) {
            case MemberStatus.APPLICANT:
                textColor = "orange";
                break;
            case MemberStatus.MEMBER:
                textColor = "green";
                break;
            case MemberStatus.FORMER_MEMBER:
                textColor = "purple";
                break;
            case MemberStatus.BANNED:
                textColor = "red";
                break;
            default:
                break;
        }

        return (
            <Box sx={{color: textColor}}>
                {parseMemberStatus(status)}
            </Box>
        );
        }
    }
];

export default function ClubsTable({allClubs, clubsOfUser}: ClubsTableProps) {
    const [currentClubs, setCurrentClubs] = React.useState<ClubAffiliation[]>(clubsOfUser);

    const addClubToUser = (newClub: Club | null | undefined) => {
        if (newClub){
            const newClubAffiliation:ClubAffiliation = {...newClub, status: MemberStatus.APPLICANT}
            setCurrentClubs([...currentClubs, newClubAffiliation]);
        } else {
            console.warn("Selected club was null or undefined");
        }
    };

    return (
        <Paper
            sx={{
                m: 2,
                display: "flex"
            }}
        >
            <DataGrid
                sx={{
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "gray",
                        color: "white"
                    }
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
    )
}