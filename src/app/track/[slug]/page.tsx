'use client'

import { useSearchParams } from "next/navigation"
import WaveSurfer from "wavesurfer.js"

import WaveTrack from "@/components/track/wavetrack"
import MusicPlayerSlider from "@/components/track/boxplaytrack"
import { Box, Container } from "@mui/material"
const trackDetail = (props: any) => {

    const searchParams = useSearchParams()
    const name = searchParams.get("audio")

    return (

        <Container sx={{ marginTop: "50px", }
        }>
            <Box sx={{ background: "#333", padding: "155px 400px 20px 30px", position: "relative", }}>

                <WaveTrack name={name ? name : ""} ></WaveTrack>
                <img src="" alt="" style={{ width: "214px", height: "222px", position: "absolute", top: "53px", right: "88px" }} />
            </Box>

        </Container >



    )
}
export default trackDetail;