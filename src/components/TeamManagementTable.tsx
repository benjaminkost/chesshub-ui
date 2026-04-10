import {
    Alert,
    Grid,
    Paper,
    Snackbar,
    SnackbarCloseReason,
    Typography
} from "@mui/material";
import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import React from "react";
import TeamMemberRoleManager from "./TeamMemberRoleManager";
import {AddUserToTeamSearchBar} from "@/components/TableSearchAndAddButton";
import {useNavigate, useParams} from "react-router-dom";
import {TeamRole} from "@/types/common/roles";
import {TeamMemberVm, UserSimpleVm} from "@/types/viewmodels/user.vm";
import {TeamVm} from "@/types/viewmodels/team.vm";
import {mapUserSimpleVmToMemberVm} from "../../bff/src/mapper/user.mapper";
import {ROUTES} from "@/routes";

interface TeamManagementTableProps {
    team: TeamVm;
    allUsers: UserSimpleVm[];
}

const cssForMemberRole = (role: TeamRole) => {
    switch (role) {
        case TeamRole.ADMIN:
            return {
                backgroundColor: "red",
                color: "white"
            };
        case TeamRole.HEAD_COACH:
            return {
                backgroundColor: "orange",
                color: "white"
            };
        case TeamRole.CAPTAIN:
            return {
                backgroundColor: "purple",
                color: "white"
            };
        case TeamRole.PLAYER:
            return {
                backgroundColor: "blue",
                color: "white"
            };
        case TeamRole.RESERVE:
            return {
                backgroundColor: "lightblue",
                color: "white"
            };
        default:
            return {
                backgroundColor: "black",
                color: "white"
            }
    }
}

export default function TeamManagementTable({team, allUsers}: TeamManagementTableProps) {
    const [currentMembers, setCurrentMembers] = React.useState<TeamMemberVm[]>(team.members ?? []);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>();
    const { clubId } = useParams();
    const navigate = useNavigate();

    const addUserToTeam = (selectedUser: UserSimpleVm | null) => {
        if (!selectedUser) return;

        const memberToAdd: TeamMemberVm = mapUserSimpleVmToMemberVm(selectedUser, [TeamRole.PLAYER]);

        setCurrentMembers([...currentMembers, memberToAdd]);
    };

    const addRole = (rowId: GridRowId, role: TeamRole) => {
        setCurrentMembers(prev => prev.map(m => m.id === rowId ? {...m, roles: [...m.roles, role]} : m));
    };

    const deleteRole = (rowId: GridRowId, role: TeamRole) => {
        if (role === TeamRole.ADMIN) {
            const adminCount = currentMembers.filter((m) => m.roles.includes(TeamRole.ADMIN)).length;

            if (adminCount == 1){
                setOpenSnackbar(true);
                return
            }
        }

        setCurrentMembers((prev) =>
            prev.map((m) =>
                m.id === rowId ?
                    {...m, roles: m.roles.filter(r => r !== role)}
                    :
                    m
            )
        );
    };

    const handleClose =  (_: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    }

    const clubsTableColumns = React.useMemo<GridColDef[]>(() => [
        {field: "id", headerName: "ID", resizable: false, flex: 1},
        {field: "name", headerName: "Spielername", resizable: false, flex: 4},
        {
            field: "roles", headerName: "Rollen", resizable: false, flex: 6,
            renderCell: (params) => {

                return <TeamMemberRoleManager
                    rolesOfUser={params.value as TeamRole[]}
                    onAddRole={(role) => addRole(params.id, role)}
                    onDeleteRole={(role) => deleteRole(params.id, role)}
                    cssForMemberRole={cssForMemberRole}
                />
            }
        }
    ], [currentMembers]);

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={"warning"}
                    sx={{
                        border: "solid 1px",
                        borderColor: "orange",
                        backgroundColor: 'hsl(39, 100%, 60%)',
                        color: "white"
                    }}
                >
                    There has to be at least one Admin
                </Alert>
            </Snackbar>
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
                        <Typography sx={{fontWeight: "bold"}}>Mannschafts-ID:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography>{team.id}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{fontWeight: "bold"}}>Mannschaftsname:</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography>{team.name}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography sx={{fontWeight: "bold"}}>Vereinsname:</Typography>
                    </Grid>
                    <Grid size={6} onClick={() => clubId && navigate(ROUTES.CLUBS.MANAGE.func(Number(clubId)))}
                          sx={{
                              "&:hover":
                                  {color: "blue", cursor: "pointer"}
                          }}>
                        <Typography>{team.clubName}</Typography>
                    </Grid>
                </Grid>
            </Paper>
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
                    getRowHeight={() => 'auto'}
                />
            </Paper>
        </>
    )
}