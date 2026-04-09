import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { GameMetaData } from "@/types/viewmodels/game.vm";
import { TeamSimpleVm } from "@/types/viewmodels/team.vm";
import {useLookup} from "@/context/LookupContext";

interface MetaDataForGameInputProps {
    allTeams: TeamSimpleVm[];
    gameMetaData: GameMetaData;
    onChangeGameMetaData: (update: Partial<GameMetaData>) => void;
}

export function MetaDataForGameInput({
    allTeams,
    gameMetaData,
    onChangeGameMetaData }: MetaDataForGameInputProps) {
    const allUsers = Object.values(useLookup().usersSimple);

    const handleDate = (value: PickerValue, _: PickerChangeHandlerContext<DateValidationError>) => {
        onChangeGameMetaData({ date: value });
    }

    const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeGameMetaData({ event: event.target.value });
    }

    const handleRound = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeGameMetaData({ round: Number(event.target.value) });
    }

    return (
        <Box
            sx={{
                width: 600,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <Grid container rowSpacing={1} columnSpacing={1} >
                <Grid size={2}>
                    <Typography>Weiß</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete freeSolo
                        value={gameMetaData.whitePlayerName || null}
                        renderInput={(params) => { return <TextField {...params} /> }}
                        options={allUsers}
                        getOptionLabel={(option) => {
                            if (typeof option === "string") return option;
                            return `${option.name} (${option.userName})`;
                        }}
                        onChange={(_, newValue) => {
                            if (newValue === null) return;
                            if (typeof newValue === "string") {
                                onChangeGameMetaData({ whitePlayerName: newValue });
                            } else {
                                onChangeGameMetaData({ whitePlayerName: newValue.name, whitePlayerId: newValue.id });
                            }
                        }}
                    />
                </Grid>
                <Grid size={2}>
                    <Typography>Schwarz</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete freeSolo
                        renderInput={(params) => { return <TextField {...params} /> }}
                        value={gameMetaData.blackPlayerName || null}
                        options={allUsers}
                        getOptionLabel={(option) => {
                            if (typeof option === "string") return option
                            return `${option.name} (${option.userName})`;
                        }}
                        onChange={(_, newValue) => {
                            if (newValue === null) return;
                            if (typeof newValue === "string") {
                                onChangeGameMetaData({ blackPlayerName: newValue });
                            } else {
                                onChangeGameMetaData({ blackPlayerName: newValue.name, blackPlayerId: newValue.id });
                            }
                        }}
                    />
                </Grid>
                <Grid size={2}>
                    <Typography>Datum</Typography>
                </Grid>
                <Grid size={10}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={gameMetaData.date}
                            format={"DD.MM.YYYY"}
                            onChange={handleDate}
                            slotProps={{
                                textField: {
                                    fullWidth: true
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid size={2}>
                    <Typography>Event</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField fullWidth value={gameMetaData.event} onChange={handleEvent} />
                </Grid>
                <Grid size={2}>
                    <Typography>Runde</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField fullWidth value={gameMetaData.round} onChange={handleRound} />
                </Grid>
                <Grid size={2}>
                    <Typography>Mannschaft</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete
                        renderInput={(params) => { return <TextField {...params} /> }}
                        options={allTeams}
                        getOptionLabel={(option) => {
                            return `${option.clubName} - ${option.name}`;
                        }}
                        onChange={(_, value) => {
                            value ? onChangeGameMetaData({ teamName: value.name, teamId: value.id }) : console.warn("Input cound not be safed");
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}