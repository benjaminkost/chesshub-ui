import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/routes";
import {useAuth} from "@/context/AuthContext";

interface RepositoryStruct {
    label: string,
    path: string
}

const defaultRepositoryOptions: RepositoryStruct[] = [
    {label: "Oberfläche", path: "https://github.com/benjaminkost/chesshub-ui.git"},
    {label: "Verarbeitsungslogiken", path: "https://github.com/benjaminkost/chesshub-core"},
    {label: "Partieformularerkennung", path: "https://github.com/benjaminkost/chess-scoresheet-digitalization-service.git"}
];

interface BugReportContentProps {
    repositoryOptions?: RepositoryStruct[]
}

export function BugReportContent({repositoryOptions=defaultRepositoryOptions}: BugReportContentProps) {
    const [repo, setRepo] = React.useState<string>();
    const [bugDescription, setBugDescription] = React.useState<string>();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBugDescription(event.target.value);
    }

    const handleSend = () => {
        if(!user) {
            navigate(ROUTES.AUTH.LOGIN.func());
            return;
        }
        navigate(ROUTES.GAMES.LIST_USER.func(user.id));
    }

    const handleSelectRepo = (event: SelectChangeEvent) => {
        setRepo(event.target.value);
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 5
        }}>
            <Paper sx={{
                backgroundColor: "lightgray",
            }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: 400,
                m: 2
            }}>
                <Typography variant={"h5"} sx={{mb: 2, color: "white"}}>Problem melden</Typography>
                <FormControl fullWidth sx={{backgroundColor: "white"}}>
                    <Select value={repo} onChange={handleSelectRepo}>
                        {repositoryOptions.map((repositoryOption) => (
                            <MenuItem value={repositoryOption.path}>{repositoryOption.label}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>
                <TextField fullWidth sx={{backgroundColor: "white"}} multiline rows={4} value={bugDescription} onChange={handleTextInput}/>
                <Button disabled={!repo || !bugDescription} sx={{ backgroundColor: "gray", color: "white"}} onClick={handleSend}>Abschicken</Button>
            </Box>
            </Paper>
        </Box>
    );
}