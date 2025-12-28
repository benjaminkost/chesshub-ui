import {IconButton} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfileComponent() {
    return (
        <IconButton
            color={"inherit"}
            aria-label={"account of current user"}
        >
            <AccountCircleIcon color={"inherit"} />
        </IconButton>
    )
}

export default ProfileComponent;