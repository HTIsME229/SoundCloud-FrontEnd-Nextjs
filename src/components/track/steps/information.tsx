'use client'

import { Box, Grid, Paper, TextField } from "@mui/material"
import LinearWithValueLabel from "./progress"
import { styled } from '@mui/material/styles';
import InputFileUpload from "../upload.file.button";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));
interface Iprops {
    trackUpload: string,
    percent: number
}
const Information = (props: Iprops) => {

    return (

        <>
            <h3>Your uploading track:{props.trackUpload}</h3>
            <LinearWithValueLabel percent={props.percent} ></LinearWithValueLabel>
            <Box sx={{ flexGrow: 1, padding: "50px 50px" }}>
                <Grid container spacing={2}>
                    <Grid sx={{ textAlign: 'center' }} item xs={4} md={4}>
                        <img style={{ width: "250px", height: '250px', marginBottom: "20px" }} src="" alt="" />
                        <InputFileUpload ></InputFileUpload>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Grid container spacing={1} rowGap={5}>
                            <Grid md={12}>
                                <TextField fullWidth id="standard-basic" label="Title" variant="standard" />
                            </Grid>
                            <Grid md={12}>
                                <TextField fullWidth id="standard-basic" label="Description" variant="standard" />
                            </Grid>
                            <Grid md={12}>
                                <TextField fullWidth id="standard-basic" label="Category" variant="standard" />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}
export default Information