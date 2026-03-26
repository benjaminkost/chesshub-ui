import {Autocomplete, Box, Button, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import {User} from "@/types/user";
import {Team} from "@/types/team";

interface MetaDataForGameInputProps {
    whitePlayerData: string;
    setWhitePlayer: (whitePlayer:string) => void;
    blackPlayerData: string;
    setBlackPlayer: (blackPlayer:string) => void;
    dateData: Date | undefined;
    setDate: (date: Date) => void;
    eventData: string;
    setEvent: (event: string) => void;
    roundData: number | undefined;
    setRound: (round:number) => void;
    team: Team | undefined;
    setTeam: (team:Team | undefined) => void;
    allTeams: Team[];
    user: User;
}

export function MetaDataForGameInput({whitePlayerData, setWhitePlayer,blackPlayerData,setBlackPlayer,dateData,setDate,eventData,setEvent,roundData,setRound,team,setTeam,allTeams,user}: MetaDataForGameInputProps) {
    const handleWhitePlayer = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setWhitePlayer(event.target.value);
    }

    const handleBlackPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBlackPlayer(event.target.value);
    }

    const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateFormatted = new Date(event.target.value);
        setDate(dateFormatted);
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
            <Button onClick={handleOwnGame}>Mein Spiel</Button>
            <Grid container rowSpacing={1} columnSpacing={1} >
                <Grid size={2}>
                    <Typography>Weiß</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField fullWidth value={whitePlayerData} onChange={handleWhitePlayer}/>
                </Grid>
                <Grid size={2}>
                    <Typography>Schwarz</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField fullWidth value={blackPlayerData} onChange={handleBlackPlayer} />
                </Grid>
                <Grid size={2}>
                    <Typography>Datum</Typography>
                </Grid>
                <Grid size={10}>
                    <TextField fullWidth value={dateData} onChange={handleDate} />
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
                                  onChange={(event, value) => {
                                      value ? setTeam(value) : console.warn("Input cound not be safed");
                                  }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}