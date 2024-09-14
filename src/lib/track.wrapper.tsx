'use client';

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext({})

export const TrackContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initValue = {
        id: "",
        title: "",
        description: "",
        url: "",
        imgUrl: "",
        category: "",
        isPlaying: false,
        currentTime: -0,
        time: 0


    }

    const [currentTrack, setCurrentTrack] = useState<IShareTrack>(
        initValue
    )
    const [time, setTime] = useState<number>(0)


    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack, time, setTime }}>
            {children}
        </TrackContext.Provider>
    )
};

// export const useThemeContext = () => useContext(TrackContext);