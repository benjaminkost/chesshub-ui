import {Box, Link} from "@mui/material";
import "@/styles/App.css";
import {ROUTES} from "@/routes";

interface MediaAttributes {
    label: string,
    path?: string,
    action?: string
}

export interface FooterProps{
    media?: MediaAttributes[],
}

export const defaultMedia = [
    { label: "Über ChessHub", path: ROUTES.ABOUT.func()},
    { label: "Impressum", path: ROUTES.IMPRESSUM.func()},
    { label: "Problem melden", path: ROUTES.BUG_REPORT.func()}
];

export default function Footer({media=defaultMedia}: FooterProps) {

    return (
        <>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        top: 5,
                        height: 80,
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 -5px 10px rgb(0,0,0,0.1)",
                        backgroundColor: "#bdbdbd",
                        color: "#424242",
                        gap: 4
                }}
                >
                    {
                        media.map((elem) => (
                            <Link key={elem.label} sx={{
                                fontWeight: "bold",
                                cursor: "pointer",
                                color: "white",
                                textDecoration: "none",
                                "&:hover": { color: "primary.main" }
                            }}
                                  href={elem.path}
                            >
                                {elem.label}
                            </Link>
                        ))
                    }
                </Box>
        </>
    )
}