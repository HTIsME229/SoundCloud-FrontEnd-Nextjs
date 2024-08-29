'use client'

import { useSearchParams } from "next/navigation"
import WaveSurfer from "wavesurfer.js"

import WaveTrack from "@/components/track/wavetrack"
import MusicPlayerSlider from "@/components/track/boxplaytrack"
const trackDetail = (props: any) => {

    const searchParams = useSearchParams()
    const name = searchParams.get("audio")

    return (
        <>
            {/* <MusicPlayerSlider></MusicPlayerSlider> */}
            <WaveTrack name={name ? name : ""} ></WaveTrack></>

    )
}
export default trackDetail;