'use client'

import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Slide, SlideProps, Snackbar, TextField } from "@mui/material"
import LinearWithValueLabel from "./progress"
import { styled } from '@mui/material/styles';
import InputFileUpload from "../upload.file.button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/app/utils/api";
import { useToast } from "@/app/utils/toast";
import Image from "next/image";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

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
    setPercent: (e: number) => void
    setValue: (v: number) => void;
}
function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const Information = (props: Iprops) => {

    const session = useSession()
    const [open, setOpen] = useState(false)
    const [openErr, setOpenErr] = useState(false)
    const [info, setInfo] = useState<INewTrack>(

        {
            title: "",
            category: "",
            description: "",
            imgUrl: "",
            url: ""
        }
    );
    const [err, setErr] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const toast = useToast()
    const router = useRouter()
    const handleCreateTrack = async () => {


        const res = await sendRequest<IBackendRes<ITrack>>(
            {

                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks`,
                method: "Post",
                body: {
                    title: info.title,
                    category: info.category,
                    description: info.description,
                    imgUrl: info.imgUrl,
                    url: info.url,
                    count_like: 0,
                    count_play: 0

                },
                headers: {
                    Authorization: `Bearer ${session.data?.access_token}`,

                }

            }
        )

        if (res.data) {
            // setOpen(true)
            toast.success(res.message)
            props.setValue(0)
            const revalidate = await sendRequest<any>(
                {

                    url: `http://localhost:3000/api/revalidate?tag=uploadTrack&secret=HTISME`,
                    method: "Post",

                }
            )
            router.refresh();



        }
        else {
            toast.error(res.message[0])
            // setErr(res.message)
            // setOpenErr(true)
        }
    }
    useEffect(() => {
        setInfo({
            ...info,
            url: props.trackUpload,
            imgUrl: imgUrl

        })

    }, [props.trackUpload, imgUrl])



    return (

        <>
            <h3>Your uploading track:{props.trackUpload}</h3>
            <LinearWithValueLabel value={props.percent} ></LinearWithValueLabel>
            <Box sx={{ flexGrow: 1, padding: "50px 50px" }}>
                <Grid container spacing={2}>
                    <Grid sx={{ textAlign: 'center' }} item xs={4} md={4}>
                        <Image width={250} height={250} style={{ marginBottom: "20px" }} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/images/${imgUrl}`} alt=""></Image>

                        <InputFileUpload target="images" setImgUrl={setImgUrl} ></InputFileUpload>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Grid container spacing={1} rowGap={5}>
                            <Grid md={12}>
                                <TextField value={info?.title} onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        title: e.target.value

                                    })
                                }} fullWidth id="standard-basic" label="Title" variant="standard" />
                            </Grid>
                            <Grid md={12}>
                                <TextField onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        description: e.target.value

                                    })
                                }}
                                    fullWidth id="standard-basic" label="Description" variant="standard" />
                            </Grid>
                            <Grid md={12}>
                                <FormControl variant="standard" fullWidth>

                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            category: e.target.value

                                        })
                                    }}

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={info.category}
                                        label="Category"

                                    >
                                        <MenuItem value={"CHILL"}>CHILL</MenuItem>
                                        <MenuItem value={"WORKOUT"}>WORKOUT</MenuItem>
                                        <MenuItem value={"CHILL"}>CHILL</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Button onClick={() => { handleCreateTrack() }} variant="outlined" >Save</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
            <Snackbar
                open={open}

                autoHideDuration={5000}
                onClose={() => setOpen(false)}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Vị trí góc dưới bên phải
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Upload Track Success
                </Alert>
            </Snackbar>
            <Snackbar
                open={openErr}

                autoHideDuration={5000}
                onClose={() => setOpen(false)}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Vị trí góc dưới bên phải
            >
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {err[0]}
                </Alert>
            </Snackbar>

        </>
    )
}
export default Information