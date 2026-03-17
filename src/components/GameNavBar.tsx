import { Box } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';


export default function GameNavBar() {

    return (
        <Box
            sx={{
                display: "flex",
                padding: 1,
                justifyContent: "center"
            }}
        >
            <FirstPageIcon />
            <ArrowBackIosIcon/>
            <ArrowForwardIosIcon/>
            <LastPage />
        </Box>
    );
}