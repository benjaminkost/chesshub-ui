import React from "react";
import {GridFooterContainer} from "@mui/x-data-grid";
import {Autocomplete, Box, Button, ClickAwayListener, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ClubAffiliationVm, ClubSimpleVm} from "@/types/viewmodels/club.vm";
import {TeamMemberVm, UserSimpleVm} from "@/types/viewmodels/user.vm";

export interface AddClubToAffiliation {
    allClubs: ClubSimpleVm[],
    clubsOfUser: ClubAffiliationVm[],
    addClubToUser: (clubId: number) => void
}

export function AddClubToAffiliation({allClubs, clubsOfUser, addClubToUser}: AddClubToAffiliation){
    const [clicked, setClicked] = React.useState(false);
    const clubsOfUserIds = new Set(clubsOfUser.map((c) => c.id))
    const clubsUserIsNotApart = allClubs.filter((club) => !clubsOfUserIds.has(club.id));
    const [selectedClub, setSelectedClub] = React.useState<ClubSimpleVm | null>();

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
                                options={clubsUserIsNotApart}
                                getOptionLabel={(option:ClubSimpleVm | string) => {
                                    return typeof option === 'string' ? option : `${option.name} (${option.id})`
                                }}
                                renderInput={(params) => <TextField{...params}/>}
                                onChange={(_, selectedClub:ClubSimpleVm | string | null) => {
                                    typeof selectedClub === 'string' ?
                                        console.log("String was tipped in no ClubModel selected")
                                        :
                                        setSelectedClub(selectedClub)
                                }}
                            />
                            <Button
                                sx={{
                                    backgroundColor: "lightgray",
                                    color: "white",
                                    mr: 1,
                                    ml: 1
                                }}
                                onClick={() => selectedClub && addClubToUser(selectedClub.id)}
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

export interface AddUserToTeamSearchBarProps {
    allUsers: UserSimpleVm[],
    membersInTeam: TeamMemberVm[],
    addUserToTeam: (newMember: UserSimpleVm) => void
}

export function AddUserToTeamSearchBar({allUsers, membersInTeam, addUserToTeam}: AddUserToTeamSearchBarProps){
    const [open, setOpen] = React.useState(false);
    const membersInTeamIds = new Set(membersInTeam.map((m) => m.id))
    const usersNotApartOfTeam = allUsers.filter((member) => !membersInTeamIds.has(member.id));
    const [selectedUser, setSelectedUser] = React.useState<UserSimpleVm | null>(null);

    const handleOnClick = () => {
        if (selectedUser){
            addUserToTeam(selectedUser);
            setOpen(false);
            setSelectedUser(null);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    }

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
                    open ?
                        (<>
                            <ClickAwayListener onClickAway={handleClose} >
                                <Box sx={{display: "flex", width: "100%"}}>
                                    <Autocomplete
                                        fullWidth
                                        freeSolo
                                        options={usersNotApartOfTeam}
                                        getOptionLabel={(option:UserSimpleVm | string) => {
                                            return typeof option === 'string' ? option : `${option.name} (${option.id})`
                                        }}
                                        renderInput={(params) => <TextField{...params} placeholder={"Neueres Mannschaftsmitglied"}/>}
                                        onChange={(_, selectedUser:UserSimpleVm | string | null) => {
                                            typeof selectedUser === 'string' ?
                                                console.log("String was tipped in no UserModel selected")
                                                :
                                                setSelectedUser(selectedUser)
                                        }}
                                    />
                                    <Button
                                        sx={{
                                            backgroundColor: "lightgray",
                                            color: "white",
                                            mr: 1,
                                            ml: 1
                                        }}
                                        onClick={handleOnClick}
                                    >
                                        Hinzufügen
                                    </Button>
                                </Box>
                            </ClickAwayListener>
                        </>)
                        :
                        (<Button
                            startIcon={<AddIcon/>}
                            fullWidth
                            sx={{backgroundColor: "lightgray", color: "white"}}
                            onClick={() => open ? setOpen(false) : setOpen(true)}
                        />)
                }
            </Box>
        </GridFooterContainer>
    );
}