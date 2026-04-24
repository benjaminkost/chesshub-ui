import React from "react";
import { GridFooterContainer } from "@mui/x-data-grid";
import { Autocomplete, Box, Button, ClickAwayListener, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ClubSimple, TeamMember, UserSimple } from "@benaurel/chesshub-core-client";
import {useLookup} from "@/context/LookupContext";

export interface AddClubToAffiliationProps {
    allClubs: ClubSimple[];
    clubsOfUser: (ClubSimple & { status?: any })[];
    addClubToUser: (club: ClubSimple | null) => void;
}

export function AddClubToAffiliation({ allClubs, clubsOfUser, addClubToUser }: AddClubToAffiliationProps) {
    const [clicked, setClicked] = React.useState(false);
    const clubsOfUserIds = new Set(clubsOfUser.map((c) => c.id));
    const clubsUserIsNotApart = allClubs.filter((club) => !clubsOfUserIds.has(club.id));
    const [selectedClub, setSelectedClub] = React.useState<ClubSimple | null>(null);

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
                {clicked ? (
                    <>
                        <Autocomplete
                            fullWidth
                            freeSolo
                            options={clubsUserIsNotApart}
                            getOptionLabel={(option) => {
                                return typeof option === 'string' ? option : `${option.name} (${option.id})`;
                            }}
                            renderInput={(params) => <TextField {...params} placeholder="Verein suchen..." />}
                            onChange={(_, selected) => {
                                typeof selected === 'string'
                                    ? console.log("String was typed in no ClubModel selected")
                                    : setSelectedClub(selected);
                            }}
                        />
                        <Button
                            sx={{
                                backgroundColor: "lightgray",
                                color: "white",
                                mr: 1,
                                ml: 1
                            }}
                            onClick={() => selectedClub && addClubToUser(selectedClub)}
                        >
                            Anfragen
                        </Button>
                    </>
                ) : (
                    <Button
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ backgroundColor: "lightgray", color: "white" }}
                        onClick={() => setClicked(true)}
                    />
                )}
            </Box>
        </GridFooterContainer>
    );
}

export interface AddUserToTeamSearchBarProps {
    membersInTeam: TeamMember[];
    addUserToTeam: (newMember: UserSimple | null) => void;
}

export function AddUserToTeamSearchBar({membersInTeam, addUserToTeam }: AddUserToTeamSearchBarProps) {
    const [open, setOpen] = React.useState(false);
    const membersInTeamIds = new Set(membersInTeam.map((m) => m.id));
    const { usersSimple } = useLookup();
    const usersNotApartOfTeam = Object.values(usersSimple).filter((member) => !membersInTeamIds.has(member.id));
    const [selectedUser, setSelectedUser] = React.useState<UserSimple | null>(null);

    const handleOnClick = () => {
        if (selectedUser) {
            addUserToTeam(selectedUser);
            setOpen(false);
            setSelectedUser(null);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

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
                {open ? (
                    <>
                        <ClickAwayListener onClickAway={handleClose}>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Autocomplete
                                    fullWidth
                                    freeSolo
                                    options={usersNotApartOfTeam}
                                    getOptionLabel={(option) => {
                                        return typeof option === 'string' ? option : `${option.name} (${option.id})`;
                                    }}
                                    renderInput={(params) => <TextField {...params} placeholder={"Neueres Mannschaftsmitglied"} />}
                                    onChange={(_, selected) => {
                                        typeof selected === 'string'
                                            ? console.log("String was typed in no UserModel selected")
                                            : setSelectedUser(selected);
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
                    </>
                ) : (
                    <Button
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ backgroundColor: "lightgray", color: "white" }}
                        onClick={() => setOpen(true)}
                    />
                )}
            </Box>
        </GridFooterContainer>
    );
}