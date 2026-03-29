import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

export function AboutChessHubContent() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                m: 2,
                gap: 2
            }}
        >
            <Typography variant={"h3"}>Über ChessHub</Typography>
            <Typography variant={"body1"}>Diese Webseite ist ein Projekt, um Schachpartien zu verwalten.
                Spezifisch geht es darum sowohl einigene Partien als auch Mannschaftspartien struktuiert abzuspeichern.
                Außerdem soll dieses Projekt in Zukunft es möglich machen sich in allen Vereinen in Deutschland zu bewerben
                und bei Tournieren sich anzumelden. Neben der Anmelden soll eine deutlich komplexere Partieanalyse
                bereitgestellt werden sowie viele andere Funktionalitäten.
            </Typography>
        </Box>
    )
}