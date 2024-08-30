'use client'
import { FormatTime, useWaveSurfer } from "@/app/utils/cutomhook"
import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import WaveSurfer, { WaveSurferEvents, WaveSurferOptions } from "wavesurfer.js"
import "./wave.scss"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Key } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
interface Iprops {
    name: string
}


const WaveTrack = (props: Iprops) => {
    const containerRef = useRef<HTMLInputElement>(null)
    const timeRef = useRef<HTMLInputElement>(null)
    const durationRef = useRef<HTMLInputElement>(null)
    const hoverRef = useRef<HTMLInputElement>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)



    const optionsmemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
        let gradient, progressGradient;
        if (typeof window !== "undefined") {
            const ctx = document.createElement('canvas').getContext('2d')!;
            const canvas = document.createElement('canvas')
            gradient = ctx?.createLinearGradient(0, 0, 0, canvas.height * 1.35)!;
            gradient?.addColorStop(0, '#656666') // Top color
            gradient?.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient?.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient?.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient?.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient?.addColorStop(1, '#B1B1B1')
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)!;
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }
        return {
            height: 150,
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}upload/TrackAudio/${props.name}`,
            barWidth: 2,
            waveColor: gradient,
            progressColor: progressGradient,

        }
    }, [])

    const waveSurfer = useWaveSurfer(containerRef, optionsmemo)

    const timeEl = timeRef.current!;
    const durationEl = durationRef.current!;
    if (waveSurfer) {
        waveSurfer.on('decode', (duration) => (durationEl.textContent = FormatTime(duration)))
        waveSurfer.on('timeupdate', (currentTime) => (timeEl.textContent = FormatTime(currentTime)))
        waveSurfer.once('interaction', () => {
            waveSurfer.play()
            setIsPlaying(true)
        })

    }
    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    if (waveform)
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))
    const onPlayPause = useCallback(() => {
        waveSurfer && waveSurfer.playPause()
        setIsPlaying(!isPlaying)
    }, [waveSurfer, isPlaying])
    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8080/upload/images/1724669291761-chill.jpg",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8080/upload/images/1724669291761-chill.jpg",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8080/upload/images/1724669291761-chill.jpg",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]
    const calLeft = (moment: number) => {
        const total = 157
        const percent = moment / total * 100;
        return percent


    }
    return (
        <div>
            <div ref={containerRef} className="waveform">
                <div ref={timeRef} className="time">0:00</div>
                <div ref={durationRef} className="duration">0:00</div>
                <div className="hover" ref={hoverRef}></div>
                <div className="comments">
                    {
                        arrComments && arrComments.map((item) => {
                            return (
                                <Tooltip title={item.content} arrow>
                                    <img key={item.id}
                                        style={{
                                            height: "18px", width: "18px", position: "absolute", bottom: '0', left: `${calLeft(item.moment)}%`, zIndex: "10"

                                        }
                                        } src={item.avatar} alt="" onPointerMove={(e) => {
                                            const hover = hoverRef.current!;
                                            hover.style.width = `${calLeft(item.moment)}%`

                                        }} />
                                </Tooltip>
                            )
                        })
                    }

                </div>
            </div>
            <div className="head">
                <button className="button-play" onClick={() => onPlayPause()}> {isPlaying ? <PauseIcon sx={{ width: "30px", height: "30px" }}></PauseIcon> : <PlayArrowIcon sx={{ width: "30px", height: "30px" }} ></PlayArrowIcon>} </button>

                <div className="title">
                    <h1 className="name">EDM WORKOUT</h1>
                    <h2 className="author">AUTHOR</h2>
                </div>

                {/* <div>{waveSurfer?.getDuration()}</div> */}
            </div>


        </div >
    )

}
export default WaveTrack