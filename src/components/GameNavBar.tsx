import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import React from "react";
import {tokens} from "@/styles/theme";

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
                backgroundColor: tokens.color.surfaceContainerLow,
                borderTop: `1px solid rgba(69,70,77,0.15)`,
                borderRadius: `0 0 ${tokens.radius.md} ${tokens.radius.md}`,
            }}
        >
            <IconButton sx={{ flex: 1, color: tokens.color.onSurfaceVariant, transition: `color ${tokens.transition.base}`, "&:hover": { color: tokens.color.primary } }} onClick={onBackToStart}>
                <FirstPageIcon />
            </IconButton>
            <IconButton sx={{ flex: 1, color: tokens.color.onSurfaceVariant, transition: `color ${tokens.transition.base}`, "&:hover": { color: tokens.color.primary } }} onClick={onMoveBack}>
                <ArrowBackIosIcon/>
            </IconButton>
            <IconButton sx={{ flex: 1, color: tokens.color.onSurfaceVariant, transition: `color ${tokens.transition.base}`, "&:hover": { color: tokens.color.primary } }} onClick={onMoveForward}>
                <ArrowForwardIosIcon/>
            </IconButton>
            <IconButton sx={{ flex: 1, color: tokens.color.onSurfaceVariant, transition: `color ${tokens.transition.base}`, "&:hover": { color: tokens.color.primary } }} onClick={onForwardToEnd}>
                <LastPage />
            </IconButton>
        </Box>
    );
}