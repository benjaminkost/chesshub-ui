import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';

interface GameNavBar {
    onMoveBack: () => void,
    onMoveForward: () => void,
    onBackToStart: () => void,
    onForwardToEnd: () => void
}

export default function GameNavBar({onForwardToEnd, onMoveForward, onMoveBack, onBackToStart}: GameNavBar) {

    return (
        <Box
            sx={{
                display: "flex",
                padding: 2,
                justifyContent: "center",
                position: "sticky",
                bottom: 0,
                backgroundColor: "black",
                boxShadow: "0 -5px 10px rgb(0,0,0,0.1)",
            }}
        >
            <IconButton sx={{flex: 1, color: "white"}} onClick={onBackToStart}>
                <FirstPageIcon />
            </IconButton>
            <IconButton sx={{flex: 1, color: "white"}} onClick={onMoveBack}>
                <ArrowBackIosIcon/>
            </IconButton>
            <IconButton sx={{flex: 1, color: "white"}} onClick={onMoveForward}>
                <ArrowForwardIosIcon/>
            </IconButton>
            <IconButton sx={{flex: 1, color: "white"}} onClick={onForwardToEnd}>
                <LastPage />
            </IconButton>
        </Box>
    );
}