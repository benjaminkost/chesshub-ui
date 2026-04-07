import {Box, LinearProgress, styled, Switch, SwitchProps, Typography} from "@mui/material";
import React from "react";

interface StockfishTurnOnBarProps {
    fen: string;
    id: string;
    evaluation?: number | null;
    setEvaluation: (id: string, evaluation: number | null) => void;
}

export function StockfishTurnOnBar({fen, id, setEvaluation, evaluation=null}: StockfishTurnOnBarProps) {
    const [checked, setChecked] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleLichessRequest = async () => {
        setIsLoading(true);
        try {
            // TODO: API call to backend that calls the lichess api
            console.log("Here should be the api call with parameters: position %s", fen);
            await sleep(4000);
            const lichessEval = -0.1;
            setEvaluation(id, lichessEval);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSwitchCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedState = event.target.checked;

        setChecked(newCheckedState);

        if (newCheckedState) {
            await handleLichessRequest();
        } else {
            setIsLoading(false);
        }
    }

    return (
        <Box>
            {isLoading && <LinearProgress color={"success"}/>}
            <Box sx={{display: "flex", backgroundColor: "darkgray", flexDirection: "row", alignItems: "center", p: 1, gap: 1}}>
                <IOSSwitch sx={{m:1}}
                           checked={checked}
                           onChange={handleSwitchCheck}
                           defaultChecked />
                {evaluation && evaluation > 0
                    ? (<Typography variant={"h5"} sx={{color: "white", fontWeight: "bold"}}>+{evaluation}</Typography>)
                    : (<Typography variant={"h5"} sx={{color: "white", fontWeight: "bold"}}>{evaluation}</Typography>)}
            </Box>
        </Box>
    )
}

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', {
                    backgroundColor: '#2ECA45',
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[600],
            }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
                opacity: 0.3,
            }),
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
        }),
    },
}));