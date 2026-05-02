import {Box, Tab, Tabs} from "@mui/material";
import {ChessBoardEditor, ChessBoardEditorProps} from "@/components/ChessBoardEditor";
import {UploadFileContent} from "@/components/UploadFileContent";
import React from "react";
import {tokens} from "@/styles/theme";

type InputGameContentProps = ChessBoardEditorProps;

export function InputGameContent(props: InputGameContentProps) {
    const [tabValue, setTabValue] = React.useState<number>(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number)=> {
        setTabValue(newValue);
    }

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Tabs
                    sx={{
                        color: tokens.color.onSurface,
                        "& .MuiTab-root": {
                            color: tokens.color.onSurfaceVariant,
                            fontFamily: tokens.font.body,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            fontSize: "0.75rem",
                            transition: `color ${tokens.transition.base}`,
                        },
                        "& .Mui-selected": { color: `${tokens.color.primary} !important` },
                        "& .MuiTabs-indicator": { backgroundColor: tokens.color.primary },
                    }}
                    variant={"fullWidth"}
                    onChange={handleTabChange}
                    value={tabValue}
                >
                    <Tab label={"Manuell"} />
                    <Tab label={"Datei"} />
                </Tabs>
            </Box>
            {
                tabValue === 0 && (<ChessBoardEditor {...props}/>)
            }
            {
                tabValue === 1 && (<UploadFileContent />)
            }
        </>
    )
}