'use client'
import { fetchDefaultImage, num2time } from "@/app/utils/api"
import { TrackContext } from "@/lib/track.wrapper";
import { Avatar, Box, Grid, Skeleton, TextField, Typography } from "@mui/material"
import { time } from "console";
import { Dayjs } from "dayjs"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";

dayjs.extend(relativeTime)


interface Iprops {
    arrComments: Comment[] | undefined
    handlePostComment: (v: string) => void
    jumpToTime: (v: number) => void
}
const Comment = (props: Iprops) => {
    const { data: session } = useSession();
    const [content, setContent] = useState("")

    return (
        <>
            <TextField onChange={(e) => {
                setContent(e.target.value)

            }} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    if (props.handlePostComment) {
                        props.handlePostComment(content)

                    }
                }

            }} fullWidth id="standard-basic" label="Comment" variant="standard" />
            <Grid marginTop={2} container spacing={4}>
                <Grid sx={{ paddingTop: "0", display: "flex", flexDirection: "column", alignItems: 'center' }} xs={3} md={3}>
                    <Avatar sx={{ width: "150px", height: "150px" }} src="/user/default-user.png"></Avatar>
                    <Typography sx={{ overflow: "hidden", mt: "10px" }}>{session?.user.email}</Typography>
                </Grid>
                <Grid sx={{ flexDirection: "column", rowGap: "30px" }} container xs={9} md={9}>
                    {
                        props.arrComments && props.arrComments.map((item) => {
                            return (
                                <Box sx={{ display: 'flex', justifyContent: "space-between", gap: 2 }}>

                                    <Box sx={{ display: 'flex', justifyContent: "start", gap: 2 }}>
                                        <Avatar sx={{ width: "50px", height: "50px" }} src={fetchDefaultImage(item.user.type)}></Avatar>
                                        <div>
                                            <Typography sx={{ fontSize: "13px", cursor: "pointer" }}  >{item.user.email} at <span onClick={() => {
                                                if (props.jumpToTime)
                                                    props?.jumpToTime((item.moment))
                                            }}>{num2time(item.moment)}</span></Typography>
                                            <Typography   >{item.content} </Typography>
                                        </div>
                                    </Box>
                                    <Typography sx={{ fontSize: "10px" }}>{dayjs(item.create_at).fromNow()}</Typography>
                                </Box>


                            )
                        })
                    }


                </Grid>

            </Grid >
        </>
    )
}
export default Comment