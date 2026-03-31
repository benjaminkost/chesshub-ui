import {Box, Tab, Tabs} from "@mui/material";
import {InputGameByChessBoard, InputGameByChessBoardProps} from "@/components/InputGameByChessBoard";
import {UploadFileContent} from "@/components/UploadFileContent";
import React from "react";

type InputGameContentProps = InputGameByChessBoardProps;

export function InputGameContent(props: InputGameContentProps) {
    const [tabValue, setTabValue] = React.useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number)=> {
        setTabValue(newValue);
    }

    return (
        <>
            <Box sx={{width: "100%"}}>
                <Tabs sx={{color: "black"}}
                      variant={"fullWidth"}
                      onChange={handleTabChange}
                      value={tabValue}
                >
                    <Tab label={"Manuell"} />
                    <Tab label={"Datei"} />
                </Tabs>
            </Box>
            {
                tabValue === 0 && (<InputGameByChessBoard {...props}/>)
            }
            {
                tabValue === 1 && (<UploadFileContent />)
            }
        </>
    )
}