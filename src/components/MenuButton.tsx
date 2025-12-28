import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function MenuButton() {
    return (
        <IconButton
            id={"menuButton"}
            aria-label={"menu"}
            color={"inherit"}
            sx= {{mr: 2 }}
        >
            <MenuIcon/>
        </IconButton>
    );
}

export default MenuButton;