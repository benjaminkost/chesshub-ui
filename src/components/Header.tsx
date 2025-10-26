import {Link} from "react-router-dom";
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

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <HomeIcon/>
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" }}}>
                            <Button
                            sx = {{color: "white", display: "block"}}
                            >
                                {
                                    links.map((link) => (
                                        <Link to={link.to}>{link.label}</Link>
                                    ))
                                }
                            </Button>
                        </Box>
                        <form id="search" method="get" action="#">
                            <input type="text" name="query" placeholder="Search" />
                        </form>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
        </>
    )
}