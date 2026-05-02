import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {tokens} from "@/styles/theme";

export function AboutChessHubContent() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                m: 4,
                gap: 3,
                backgroundColor: tokens.color.surfaceContainerLow,
                padding: 5,
                borderRadius: tokens.radius.xl,
            }}
        >
            <Typography variant={"h3"} sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>Über ChessHub</Typography>
            <Typography variant={"body1"} sx={{ color: tokens.color.onSurfaceVariant, fontFamily: tokens.font.body }}>Diese Webseite ist ein Projekt, um Schachpartien zu verwalten.
                Spezifisch geht es darum sowohl eigene Partien als auch Mannschaftspartien strukturiert abzuspeichern.
                Außerdem soll dieses Projekt in Zukunft es möglich machen sich in allen Vereinen in Deutschland zu bewerben
                und bei Tournieren sich anzumelden. Neben der Anmelden soll eine deutlich komplexere Partie-Analyse
                bereitgestellt werden sowie viele andere Funktionalitäten.
            </Typography>
        </Box>
    )
}