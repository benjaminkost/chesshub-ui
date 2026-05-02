import { Box } from "@mui/material";
import React from "react";
import {Header} from "@/components/Header";
import Footer, {FooterProps} from "@/components/Footer";
import {tokens} from "@/styles/theme";

interface PageLayout extends FooterProps {
    children: React.ReactNode;
}

export default function PageLayout({children}: PageLayout){
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}
        >
            <Header/>
            <Box sx={{ flexGrow: 1, background: tokens.color.surface}}>
                {children}
            </Box>
            <Footer/>
        </Box>
    )
}