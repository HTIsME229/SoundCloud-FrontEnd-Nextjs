import { useState, useEffect } from 'react';
import WaveSurfer, { WaveSurferEvents, WaveSurferOptions } from 'wavesurfer.js';


export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}
export const useWaveSurfer = (containerRef: React.RefObject<HTMLInputElement>
    , options: Omit<WaveSurferOptions, 'container'>) => {
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null)
    useEffect(() => {
        if (!containerRef.current) return
        else {
            const ws = WaveSurfer.create(
                {
                    ...options,
                    container: containerRef.current,

                }
            )
            setWaveSurfer(ws)


            return () => {
                ws.destroy()
            }
        }

    }, [options, containerRef])
    return waveSurfer
}
export const FormatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const secondsRemainder = Math.round(time) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`

}