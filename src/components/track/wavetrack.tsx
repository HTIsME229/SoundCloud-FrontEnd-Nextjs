'use client'
import { FormatTime, useWaveSurfer } from "@/app/utils/cutomhook"
import { useEffect, useRef, useState, useMemo, useCallback, useContext } from "react"
import { WaveSurferOptions } from "wavesurfer.js"
import "./wave.scss"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Box, Chip, Tooltip } from "@mui/material"
import { TrackContext } from "@/lib/track.wrapper"
import { fetchDefaultImage } from "@/app/utils/api"
import { sendRequest } from "@/app/utils/api"
import Comment from "@/components/Comment/comment"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from "next/image"

interface Iprops {
    data: ITrack | null;
    TrackLike: ITrack[] | undefined;
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
    const firstViewRef = useRef(true)
    const router = useRouter()
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
    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    const [like, setLike] = useState(1)


    const onPlayPause = useCallback(() => {

        if (waveSurfer?.isPlaying()) {
            waveSurfer.pause()
            setIsPlaying(false)


        }
        else {
            waveSurfer?.play()
            setIsPlaying(true)


        }



    }, [waveSurfer, currentTrack])

    useEffect(() => {
        console.log(currentTrack.wavesurfer)
        if (!currentTrack.wavesurfer && waveSurfer?.isPlaying()) {
            console.log('check chay')
            waveSurfer?.pause()
            setIsPlaying(false)
        }

    }, [currentTrack])
    const calLeft = (moment: number) => {
        const total = waveSurfer?.getDuration()!;
        const percent = moment / total * 100;
        return percent


    }
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
    const handleIncreaseView = async () => {
        if (firstViewRef.current) {
            const res = await sendRequest<IBackendRes<ITrack>>(
                {

                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/increase-view`,
                    method: "Post",
                    body: {
                        track: props?.data?.id


                    },
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`,
                    }

                }

            )
            firstViewRef.current = false;
            router.refresh()

        }



    }
    const handleLike = async () => {
        const res = await sendRequest<any>(
            {

                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/likes`,
                method: "post",
                body: {
                    track: props.data?.id,
                    quantity: like
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,

                }

            }
        )
        if (res.statusCode < 400) {

            const revalidate = await sendRequest<any>(
                {

                    url: `http://localhost:3000/api/revalidate?tag=like-track&secret=HTISME`,
                    method: "Post",

                }
            )
            router.refresh()
        }
    }
    useEffect(() => {
        if (props.TrackLike) {

            if (props?.TrackLike?.length > 0) {
                const isLiked = props.TrackLike.some(e => e.id == props?.data?.id);
                if (isLiked)
                    setLike(-1)
                else
                    setLike(1)
            }
            else setLike(1)
        }


    }, [props.data, props.TrackLike])


    if (waveSurfer) {
        waveSurfer.on('decode', (duration) => (durationEl.textContent = FormatTime(duration)))
        waveSurfer.on('timeupdate', (currentTime) => (timeEl.textContent = FormatTime(currentTime)))
        waveSurfer.once('interaction', () => {
            waveSurfer.play()
            setIsPlaying(true)
        })

    }

    if (waveform)
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))
    return (
        <>
            <Box sx={{ background: "#333", padding: "155px 400px 20px 30px", position: "relative", mb: '30px' }}>

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
                                            <>
                                                <Image src={fetchDefaultImage(item.user.type)} alt="comment" key={item.id}
                                                    height={20} width={20}
                                                    style={{
                                                        position: "absolute", bottom: '0', left: `${calLeft(item.moment)}%`, zIndex: "10"

                                                    }
                                                    } onPointerMove={(e) => {
                                                        const hover = hoverRef.current!;
                                                        hover.style.width = `${calLeft(item.moment)}%`

                                                    }}  ></Image>

                                            </>
                                        </Tooltip>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="head">
                        <button className="button-play" onClick={() => {
                            handleIncreaseView()
                            if (props.data)
                                if (waveSurfer) {
                                    setCurrentTrack({
                                        ...currentTrack,
                                        isPlaying: false,
                                        wavesurfer: true
                                    })
                                    onPlayPause()


                                }


                        }}> {isPlaying ? <PauseIcon sx={{ width: "30px", height: "30px" }}></PauseIcon> : <PlayArrowIcon sx={{ width: "30px", height: "30px" }} ></PlayArrowIcon>} </button>

                        <div className="title">
                            <h1 className="name">{props.data?.title}</h1>
                            <h2 className="author">{props.data?.description}</h2>
                        </div>

                        {/* <div>{waveSurfer?.getDuration()}</div> */}
                    </div>



                </div >
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/images/${props.data?.imgUrl}`} alt="img" style={{ position: "absolute", top: "53px", right: "88px" }} width={214} height={222}></Image>


            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: '20px' }}>
                <Chip onClick={() => handleLike()} icon={<FavoriteIcon />} label="Likes" color={like === 1 ? "primary" : "error"} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }} >
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>

                        <FavoriteIcon ></FavoriteIcon>
                        <span>{props.data?.countLike}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>

                        <PlayArrowIcon></PlayArrowIcon>
                        <span>{props.data?.countPlay}</span>
                    </div>

                </div>
            </Box>
            <Comment arrComments={props.arrComments}
                handlePostComment={handlePostComment}
                jumpToTime={jumpToTime}
            ></Comment>

        </>
    )

}
export default WaveTrack