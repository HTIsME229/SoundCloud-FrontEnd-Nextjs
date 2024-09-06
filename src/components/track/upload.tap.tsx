'use client'

import { Box, Container, Tab, Tabs } from "@mui/material"
import { useState } from "react";
import Step1 from "./steps/step1";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Information from "./steps/information";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const UploadTab = () => {
    const [value, setValue] = useState(0);
    const [trackUpload, setTrackUpload] = useState("")
    const [percent, setPercent] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', border: "1px solid #ccc", mt: "5px" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Track" {...a11yProps(0)} />
                    <Tab label="Basic Information" {...a11yProps(1)} />
                </Tabs>

                <CustomTabPanel value={value} index={0}>
                    <Step1 setValue={setValue}
                        setTrackUpload={setTrackUpload}
                        setPercent={setPercent}></Step1>

                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Information trackUpload={trackUpload}
                        percent={percent}
                    ></Information>
                </CustomTabPanel>

            </Box>
        </>


    )
}
export default UploadTab