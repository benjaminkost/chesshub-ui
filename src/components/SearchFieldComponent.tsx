import {Box, TextField} from "@mui/material";

function SearchFieldComponent() {
    return (
        <Box
            display={"flex"}
            component={"form"}
            noValidate
            autoComplete={"on"}
        >
            <TextField
                id="standard-basic"
                label="Standard"
                placeholder={"Search... "}
                variant={"standard"}
                size={"small"}
                sx={{
                    mb: 2,
                    '.MuiFormLabel-root': {color: "inherit" },
                    '.MuiInputBase-input': { color: 'inherit' },
                    '.MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.7)' },
                    '.MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                }}
            />
        </Box>
    )
}

export default SearchFieldComponent;