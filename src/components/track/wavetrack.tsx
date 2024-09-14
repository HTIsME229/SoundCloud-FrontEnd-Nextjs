'use client'
import { FormatTime, useWaveSurfer } from "@/app/utils/cutomhook"
import { useEffect, useRef, useState, useMemo, useCallback, useContext } from "react"
import WaveSurfer, { WaveSurferEvents, WaveSurferOptions } from "wavesurfer.js"
import "./wave.scss"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Key } from "@mui/icons-material"
import { Box, Tooltip } from "@mui/material"
import { TrackContext } from "@/lib/track.wrapper"
import { fetchDefaultImage } from "@/app/utils/api"
import { sendRequest } from "@/app/utils/api"
import Comment from "@/components/Comment/comment"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Iprops {
    data: ITrack | null;
    arrComments: Comment[] | undefined
}


const WaveTrack = (props: Iprops) => {
    const containerRef = useRef<HTMLInputElement>(null)
    const timeRef = useRef<HTMLInputElement>(null)
    const durationRef = useRef<HTMLInputElement>(null)
    const hoverRef = useRef<HTMLInputElement>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const { currentTrack, setCurrentTrack } = useContext(TrackContext) as ITrackContext
    const { data: session } = useSession()
    const router = useRouter()
    const handlePostComment = async (v: string) => {

        const res = await sendRequest<IBackendRes<ITrack>>(
            {

                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/comments`,
                method: "Post",
                body: {
                    content: v,
                    moment: waveSurfer?.getCurrentTime(),
                    track_id: props.data?.id


                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,

                }

            }

        )
        if (res.data) {
            router.refresh()

        }

    }

    const jumpToTime = (v: number) => {
        if (waveSurfer) {
            waveSurfer?.setTime(v)
            if (!waveSurfer?.isPlaying()) {
                waveSurfer?.play()
                setIsPlaying(true)
            }

        }

    }



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
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}upload/TrackAudio/${props.data?.url}`,
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
        if (waveSurfer) {
            if (waveSurfer.isPlaying()) {
                waveSurfer.pause()
                setIsPlaying(false)
            }
            else {
                waveSurfer.play()
                setIsPlaying(true)
            }
        }
    }, [waveSurfer])

    useEffect(() => {
        if (waveSurfer) {
            if (currentTrack.isPlaying) {
                waveSurfer.pause();
                setIsPlaying(false)
            }
        }
    }, [currentTrack.isPlaying])
    // useEffect(() => {
    //     setTime(waveSurfer?.getCurrentTime())

    // }, [])
    useEffect(() => {

        if (props.data)
            if (!currentTrack.id && props.data.id)
                setCurrentTrack({
                    ...currentTrack,
                    url: props?.data?.url,
                    title: props.data.title,
                    description: props.data.description,
                    id: props.data.id


                })
    }, [props.data])


    const calLeft = (moment: number) => {
        const total = 157
        const percent = moment / total * 100;
        return percent


    }
    return (
        <>
            <Box sx={{ background: "#333", padding: "155px 400px 20px 30px", position: "relative", mb: '50px' }}>

                <div>
                    <div ref={containerRef} className="waveform">
                        <div ref={timeRef} className="time">0:00</div>
                        <div ref={durationRef} className="duration">0:00</div>
                        <div className="hover" ref={hoverRef}></div>
                        <div className="comments">
                            {
                                props.arrComments && props.arrComments.map((item) => {
                                    return (
                                        <Tooltip title={item.content} arrow>
                                            <img key={item.id}
                                                style={{
                                                    height: "18px", width: "18px", position: "absolute", bottom: '0', left: `${calLeft(item.moment)}%`, zIndex: "10"

                                                }
                                                } src={fetchDefaultImage(item.user.type)} alt="" onPointerMove={(e) => {
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
                        <button className="button-play" onClick={() => {
                            if (props.data)
                                if (waveSurfer) {
                                    onPlayPause()
                                    setCurrentTrack({
                                        ...currentTrack,
                                        isPlaying: false,
                                    })

                                }


                        }}> {isPlaying ? <PauseIcon sx={{ width: "30px", height: "30px" }}></PauseIcon> : <PlayArrowIcon sx={{ width: "30px", height: "30px" }} ></PlayArrowIcon>} </button>

                        <div className="title">
                            <h1 className="name">{props.data?.title}</h1>
                            <h2 className="author">{props.data?.description}</h2>
                        </div>

                        {/* <div>{waveSurfer?.getDuration()}</div> */}
                    </div>



                </div >
                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/images/${props.data?.imgUrl}`} alt="" style={{ width: "214px", height: "222px", position: "absolute", top: "53px", right: "88px" }} />

            </Box>

            <Comment arrComments={props.arrComments}
                handlePostComment={handlePostComment}
                jumpToTime={jumpToTime}
            ></Comment>

        </>
    )

}
export default WaveTrack