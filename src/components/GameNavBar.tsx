import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import React from "react";

interface GameNavBar {
    onMoveBack: () => void,
    onMoveForward: () => void,
    onBackToStart: () => void,
    onForwardToEnd: () => void
}

export default function GameNavBar({onForwardToEnd, onMoveForward, onMoveBack, onBackToStart}: GameNavBar) {

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            const isEditable = ["INPUT", "TEXTAREA"].includes(target.tagName)
                || target.isContentEditable
                || target.getAttribute("role") === "spinbutton";

            if(isEditable) return;

            switch(event.key) {
                case "ArrowRight":
                    onMoveForward();
                    break;
                case "ArrowLeft":
                    onMoveBack();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    });

    return (
        <Box
            sx={{
                display: "flex",
                padding: 2,
                justifyContent: "center",
                position: "sticky",
                bottom: 0,
                backgroundColor: "black",
                borderTop: "1px solid rgba(255,255,255,0.15)"
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