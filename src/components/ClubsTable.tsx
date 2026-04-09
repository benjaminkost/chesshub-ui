import {Box, Paper} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {AddClubToAffiliation} from "@/components/TableSearchAndAddButton";
import {ClubMemberStatus} from "@/types/common/roles";
import {ClubAffiliationVm, ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {mapClubModelToClubAffiliation, mapClubToSimpleVM} from "../../bff/src/mapper/club.mapper";
import {useLookup} from "@/context/LookupContext";

interface ClubsTableProps {
    allClubs: ClubSimpleVm[];
    clubsOfUser: ClubAffiliationVm[];
}

const clubsTableColumns: GridColDef[] = [
    {field: "id", headerName: "ID", resizable: false, flex: 1},
    {field: "name", headerName: "Vereinsname", resizable: false, flex: 2},
    {field: "address", headerName: "Adresse", resizable: false, flex: 3},
    {field: "adminName", headerName: "Vorsitzender", resizable: false, flex: 2},
    {field: "status", headerName: "Mitgliedsstatus", resizable: false, flex: 1,
        renderCell: (params) => {
        const status = params.value as ClubMemberStatus;
        let textColor = "black";

        switch (status) {
            case ClubMemberStatus.APPLICANT:
                textColor = "orange";
                break;
            case ClubMemberStatus.MEMBER:
                textColor = "green";
                break;
            case ClubMemberStatus.FORMER_MEMBER:
                textColor = "purple";
                break;
            case ClubMemberStatus.BANNED:
                textColor = "red";
                break;
            default:
                break;
        }

        return (
            <Box sx={{color: textColor}}>
                {status}
            </Box>
        );
        }
    }
];

export default function ClubsTable({allClubs, clubsOfUser}: ClubsTableProps) {
    const [currentClubs, setCurrentClubs] = React.useState<ClubAffiliationVm[]>(clubsOfUser);
    const { usersSimple } = useLookup();

    const addClubToUser = (newClubId: number) => {
        const newClub = allClubs.find(club => club.id === newClubId);

        if (newClub){
            const newClubAffiliation = mapClubModelToClubAffiliation(newClub, ClubMemberStatus.APPLICANT, usersSimple);
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
                        allClubs={allClubs.map(club => mapClubToSimpleVM(club))}
                        clubsOfUser={currentClubs}
                        addClubToUser={addClubToUser}/>
                }}
            />
        </Paper>
    )
}