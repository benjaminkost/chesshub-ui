import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { GameMetaData } from "@/types/viewmodels/game.vm";
import { TeamSimpleVm } from "@/types/viewmodels/team.vm";
import { useLookup } from "@/context/LookupContext";

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

    return (
        <Box sx={{ width: 600, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Grid container rowSpacing={1} columnSpacing={1}>
                {/* Weiße Player */}
                <Grid size={2}>
                    <Typography>Weiß</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete 
                        freeSolo
                        value={gameMetaData.whitePlayerName || null}
                        options={allUsers}
                        getOptionLabel={(option) => typeof option === "string" ? option : `${option.name} (${option.userName})`}
                        renderInput={(params) => <TextField {...params} />}
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

                {/* Schwarze Player */}
                <Grid size={2}>
                    <Typography>Schwarz</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete 
                        freeSolo
                        value={gameMetaData.blackPlayerName || null}
                        options={allUsers}
                        getOptionLabel={(option) => typeof option === "string" ? option : `${option.name} (${option.userName})`}
                        renderInput={(params) => <TextField {...params} />}
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

                {/* Datum */}
                <Grid size={2}>
                    <Typography>Datum</Typography>
                </Grid>
                <Grid size={10}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={gameMetaData.date}
                            format={"DD.MM.YYYY"}
                            onChange={(val) => onChangeGameMetaData({ date: val })}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                </Grid>

                {/* Event */}
                <Grid size={2}>
                    <Typography>Event</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField 
                        fullWidth 
                        value={gameMetaData.event || ""} 
                        onChange={(e) => onChangeGameMetaData({ event: e.target.value })} 
                    />
                </Grid>

                {/* Runde */}
                <Grid size={2}>
                    <Typography>Runde</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField 
                        fullWidth 
                        type="number"
                        value={gameMetaData.round || ""} 
                        onChange={(e) => onChangeGameMetaData({ round: Number(e.target.value) })} 
                    />
                </Grid>

                {/* Mannschaft */}
                <Grid size={2}>
                    <Typography>Mannschaft</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete
                        options={allTeams}
                        value={allTeams.find(t => t.id === gameMetaData.teamId) || null}
                        getOptionLabel={(option) => `${option.clubName} - ${option.name}`}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(_, value) => {
                            onChangeGameMetaData({ 
                                teamName: value?.name || undefined, 
                                teamId: value?.id || undefined 
                            });
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}