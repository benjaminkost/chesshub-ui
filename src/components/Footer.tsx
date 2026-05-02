import {Box, Link} from "@mui/material";
import "@/styles/App.css";
import {ROUTES} from "@/routes";
import {tokens} from "@/styles/theme";

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
                        height: 80,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: tokens.color.surfaceContainerLow,
                        color: tokens.color.onSurfaceVariant,
                        gap: 4,
                        borderTop: `1px solid rgba(69,70,77,0.15)`,
                    }}
                >
                    {
                        media.map((elem) => (
                            <Link key={elem.label} sx={{
                                fontFamily: tokens.font.body,
                                fontSize: "0.875rem",
                                letterSpacing: "0.018em",
                                fontWeight: 500,
                                cursor: "pointer",
                                color: tokens.color.onSurfaceVariant,
                                textDecoration: "none",
                                transition: `color ${tokens.transition.base}`,
                                "&:hover": { color: tokens.color.primary }
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