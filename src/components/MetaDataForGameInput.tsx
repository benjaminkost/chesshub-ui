import {Autocomplete, Box, Button, Grid, TextField, Typography} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";
import {UserModel} from "@/types/models/user.model";
import {TeamModel} from "@/types/models/team.model";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, DateValidationError, PickerChangeHandlerContext} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import {PickerValue} from "@mui/x-date-pickers/internals";

interface MetaDataForGameInputProps {
    allUsers: UserModel[];
    whitePlayerData: UserModel | string | undefined;
    setWhitePlayer: (whitePlayer: UserModel | string | undefined) => void;
    blackPlayerData: UserModel | string | undefined;
    setBlackPlayer: (blackPlayer: UserModel | string | undefined) => void;
    dateData: Dayjs | null | undefined;
    setDate: (date: Dayjs | null) => void;
    eventData: string | undefined;
    setEvent: (event: string) => void;
    roundData: number | undefined;
    setRound: (round:number) => void;
    team: TeamModel | undefined;
    setTeam: (team:TeamModel | undefined) => void;
    allTeams: TeamModel[];
    user: UserModel;
}

export function MetaDataForGameInput({allUsers,
                                         whitePlayerData,
                                         setWhitePlayer,
                                         blackPlayerData,
                                         setBlackPlayer,
                                         dateData,
                                         setDate,
                                         eventData,
                                         setEvent,
                                         roundData,
                                         setRound,
                                         team,
                                         setTeam,
                                         allTeams,
                                         user}: MetaDataForGameInputProps) {
    const handleDate = (value: PickerValue, _: PickerChangeHandlerContext<DateValidationError>) => {
        setDate(value);
    }

    const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEvent(event.target.value);
    }

    const handleRound = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRound(Number(event.target.value));
    }

    const handleOwnGame = () => {
        setTeam(user.team);
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
            <Button onClick={handleOwnGame}
                    sx={{
                        backgroundColor: "gray",
                        color: "white",
                        mb: 2
                    }}
            >Mein Spiel</Button>
            <Grid container rowSpacing={1} columnSpacing={1} >
                <Grid size={2}>
                    <Typography>Weiß</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete freeSolo
                                   value={whitePlayerData || null}
                                  renderInput={(params) => {return <TextField {...params} />}}
                                  options={allUsers}
                                  getOptionLabel={(option)=> {
                                      if (typeof option === "string") return option;
                                      return `${option.name} (${option.userName})`;
                                  }}
                                  onChange={(_, newValue) => {
                                      if (newValue === null) return;
                                      setWhitePlayer(newValue);
                                  }} />
                </Grid>
                <Grid size={2}>
                    <Typography>Schwarz</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete freeSolo
                                  value={blackPlayerData || null}
                                  renderInput={(params) => {return <TextField {...params} />}}
                                  options={allUsers}
                                  getOptionLabel={(option)=> {
                                      if (typeof option === "string") return option
                                      return `${option.name} (${option.userName})`;
                                  }}
                                   onChange={(_, newValue) => {
                                       if (newValue === null) return;
                                       setBlackPlayer(newValue)
                                   }}
                    />
                </Grid>
                <Grid size={2}>
                    <Typography>Datum</Typography>
                </Grid>
                <Grid size={10}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={dateData}
                            format={"DD.MM.YYYY"}
                            onChange={handleDate}
                            slotProps={{
                                textField: {
                                    fullWidth: true
                            }}}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid size={2}>
                    <Typography>Event</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField fullWidth value={eventData} onChange={handleEvent} />
                </Grid>
                <Grid size={2}>
                    <Typography>Runde</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField fullWidth value={roundData} onChange={handleRound} />
                </Grid>
                <Grid size={2}>
                    <Typography>Mannschaft</Typography>
                </Grid>
                <Grid size={10}>
                    <Autocomplete renderInput={(params) => {return <TextField {...params}/>}}
                                  value={team || null}
                                  options={allTeams}
                                  getOptionLabel={(option) => {
                                      return `${option.club?.name} - ${option.name}`;
                                  }}
                                  onChange={(_, value) => {
                                      value ? setTeam(value) : console.warn("Input cound not be safed");
                                  }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}