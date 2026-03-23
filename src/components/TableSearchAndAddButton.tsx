import {Club, ClubAffiliation} from "@/types/club";
import React from "react";
import {GridFooterContainer} from "@mui/x-data-grid";
import {Autocomplete, Box, Button, ClickAwayListener, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Member} from "@/types/user";

export interface AddClubToAffiliation {
    allClubs: Club[],
    clubsOfUser: ClubAffiliation[],
    addClubToUser: (club: Club | null | undefined) => void
}

export function AddClubToAffiliation({allClubs, clubsOfUser, addClubToUser}: AddClubToAffiliation){
    const [clicked, setClicked] = React.useState(false);
    const clubsOfUserIds = new Set(clubsOfUser.map((c) => c.id))
    const clubsUserIsNotApart = allClubs.filter((club) => !clubsOfUserIds.has(club.id));
    const [selectedClub, setSelectedClub] = React.useState<Club | null>();

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
                                getOptionLabel={(option:Club | string) => {
                                    return typeof option === 'string' ? option : `${option.name} (${option.id})`
                                }}
                                renderInput={(params) => <TextField{...params}/>}
                                onChange={(event, selectedClub:Club | string | null) => {
                                    typeof selectedClub === 'string' ?
                                        console.log("String was tipped in no Club selected")
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
                                onClick={() => addClubToUser(selectedClub)}
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
    allUsers: Member[],
    membersInTeam: Member[],
    addUserToTeam: (newMember: Member) => void
}

export function AddUserToTeamSearchBar({allUsers, membersInTeam, addUserToTeam}: AddUserToTeamSearchBarProps){
    const [open, setOpen] = React.useState(false);
    const membersInTeamIds = new Set(membersInTeam.map((m) => m.id))
    const usersNotApartOfTeam = allUsers.filter((member) => !membersInTeamIds.has(member.id));
    const [selectedUser, setSelectedUser] = React.useState<Member | null>(null);

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
                                        getOptionLabel={(option:Member | string) => {
                                            return typeof option === 'string' ? option : `${option.name} (${option.id})`
                                        }}
                                        renderInput={(params) => <TextField{...params} placeholder={"Neueres Mannschaftsmitglied"}/>}
                                        onChange={(event, selectedUser:Member | string | null) => {
                                            typeof selectedUser === 'string' ?
                                                console.log("String was tipped in no User selected")
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