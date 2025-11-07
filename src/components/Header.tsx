import {useNavigate} from "react-router-dom";
import {HomeIcon} from "./HomeIcon.tsx";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import React from "react";
import Button from "@mui/material/Button";

export interface NavLink {
    to: string;
    label: string;
}

interface HeaderProps {
    links: NavLink[];
}

export function Header({ links = [] }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <>
        <Box
            sx={{
                minHeight: "10vh",
                display: "flex",
        }}>
            <AppBar position="static"
            sx ={{
            }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <HomeIcon/>
                        <Button
                            color={"inherit"}
                            variant={"contained"}
                            sx={{ ml: "auto" }}
                            onClick={() => navigate("/auth/login")}
                        >
                            Login
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
        </>
    )
}