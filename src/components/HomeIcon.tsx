import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export function HomeIcon(){
    return (
        <>
            <Box className="flex items-center">
                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                >
                    <a href="/">ChessHub</a>
                </Typography>
            </Box>
        </>
    )
}