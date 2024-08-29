'use client'
import { useEffect, useRef } from "react"
import WaveSurfer from "wavesurfer.js"

interface Iprops {
    name: string
}
const WaveTrack = (props: Iprops) => {
    const containerRef = useRef<HTMLDivElement>(null)
    let wavesurferRef = useRef<any>(null);

    useEffect(() => {
        if (containerRef.current) {
            wavesurferRef.current = WaveSurfer.create(
                {
                    container: containerRef.current,
                    waveColor: 'rgb(200, 0, 200)',
                    progressColor: 'rgb(100, 0, 100)',
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}upload/TrackAudio/${props.name}`,
                }
            )
        }
    }, [])
    const playWave = () => {
        if (wavesurferRef.current)
            wavesurferRef.current.play()
    }
    const stopWave = () => {
        if (wavesurferRef.current)
            wavesurferRef.current.stop()
    }
    return (
        <div>
            <div ref={containerRef}> </div>
            <div onClick={() => playWave()}>play </div>
            <div onClick={() => stopWave()}>stop </div>
        </div>
    )

}
export default WaveTrack