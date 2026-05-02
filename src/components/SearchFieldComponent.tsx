import React from "react";
import {Box, TextField} from "@mui/material";
import {tokens} from "@/styles/theme";

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
                placeholder={"Search... "}
                variant={"standard"}
                size={"small"}
                sx={{
                    top: 10,
                    alignItems: "center",
                    mb: 2,
                    ".MuiFormLabel-root": { color: tokens.color.onSurfaceVariant },
                    ".MuiInputBase-input": { color: tokens.color.onSurface },
                    ".MuiInput-underline:before": { borderBottomColor: tokens.color.outlineVariant },
                    ".MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: tokens.color.outline },
                    ".MuiInput-underline:after": { borderBottomColor: tokens.color.primary },
                }}
            />
        </Box>
    )
}

export default SearchFieldComponent;