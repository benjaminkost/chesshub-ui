import { Paper, Box, Button, Autocomplete, TextField, Stack, Chip, Typography } from "@mui/material";
import {DataGrid, GridColDef, GridFooterContainer} from "@mui/x-data-grid";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import {Club} from "./ClubsTable.js";

export enum MemberRole{
    ADMIN="Admin",
    CAPTAIN="Kapitän",
    HEAD_COACH="Trainer",
    PLAYER="Spieler",
    RESERVE="Ersatzspieler"
}

export interface Member{
    id: number;
    name: string;
    roles: MemberRole[];
}

export interface Team {
    id: number;
    club: Club;
    name: string;
    members: Member[];
}

interface TeamManagementTableProps {
    team: Team;
    allUsers: Member[];
}

const colorForMemberRole = (role: MemberRole):string=> {
    switch (role) {
        case MemberRole.ADMIN:
            return "red";
        case MemberRole.HEAD_COACH:
            return "orange";
        case MemberRole.CAPTAIN:
            return "purple";
        case MemberRole.PLAYER:
            return "blue";
        case MemberRole.RESERVE:
            return "lightblue";
    }
}

const handleDeleteRole = () => {

}

const clubsTableColumns: GridColDef[] = [
    {field: "id", headerName: "ID", resizable: false, flex: 1},
    {field: "name", headerName: "Spielername", resizable: false, flex: 2},
    {field: "roles", headerName: "Rollen", resizable: false, flex: 2,
        renderCell: (params) => {
            const rolesOfUser = params.value as MemberRole[];

        return (
            <Stack direction={"row"} spacing={1}>
                {
                    rolesOfUser.map((role) => (
                        <Chip
                            key={role}
                            label={role}
                            sx={{
                                backgroundColor: colorForMemberRole(role)
                            }}
                            onDelete={handleDeleteRole}
                        >
                        </Chip>
                    ))
                }
            </Stack>
        )
        }
    }
];

export default function TeamManagementTable({team, allUsers}: TeamManagementTableProps) {
    const [currentMembers, setCurrentMembers] = React.useState<Member[]>(team.members);

    const addUserToTeam = (newMember: Member) => {
        newMember.roles = [...newMember.roles, MemberRole.PLAYER];
        setCurrentMembers([...currentMembers, newMember]);
    };

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography>Mannschafts-ID: {team.id}</Typography>
                <Typography>Mannschaftsname: {team.name}</Typography>
                <Typography>Verein: {team.club.name}</Typography>
            </Box>
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
                    rows={currentMembers}
                    slots={{
                        footer: () => <AddUserToTeamSearchBar
                            allUsers={allUsers}
                            membersInTeam={currentMembers}
                            addUserToTeam={addUserToTeam}/>
                    }}
                />
            </Paper>
        </>
    )
}

interface AddUserToTeamSearchBarProps {
    allUsers: Member[],
    membersInTeam: Member[],
    addUserToTeam: (newMember: Member) => void
}

function AddUserToTeamSearchBar({allUsers, membersInTeam, addUserToTeam}: AddUserToTeamSearchBarProps){
    const [clicked, setClicked] = React.useState(false);
    const membersInTeamIds = new Set(membersInTeam.map((m) => m.id))
    const usersNotApartOfTeam = allUsers.filter((member) => !membersInTeamIds.has(member.id));
    const [selectedUser, setSelectedUser] = React.useState(null);

    return (
        <GridFooterContainer>
            <Box
                sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}
            >
                {
                    clicked ?
                        <>
                            <Autocomplete
                                fullWidth
                                freeSolo
                                options={usersNotApartOfTeam}
                                getOptionLabel={(member:Member) => `${member.name} (${member.id})`}
                                renderInput={(params) => <TextField{...params}/>}
                                onChange={(event, selectedUser:Member) => setSelectedUser(selectedUser)}
                            />
                            <Button
                                sx={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    mr: 1,
                                    ml: 1
                                }}
                                onClick={() => addUserToTeam(selectedUser)}
                            >
                                Anfragen
                            </Button>
                        </>
                        :
                        <Button
                            startIcon={<AddIcon/>}
                            fullWidth
                            sx={{backgroundColor: "lightgray", color: "white"}}
                            onClick={() => clicked ? setClicked(false) : setClicked(true)}
                        />
                }
            </Box>
        </GridFooterContainer>
    );
}