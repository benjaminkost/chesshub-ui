import { Box } from "@mui/material";
import React from "react";
import {Header, HeaderProps} from "@/components/Header";
import Footer, {FooterProps} from "@/components/Footer";

interface PageLayout extends HeaderProps, FooterProps {
    children: React.ReactNode;
}

export default function PageLayout({children, ...props}: PageLayout){
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}
        >
            <Header loggedIn={props.loggedIn}/>
            <Box sx={{ flexGrow: 1}}>
                {children}
            </Box>
            <Footer/>
        </Box>
    )
}