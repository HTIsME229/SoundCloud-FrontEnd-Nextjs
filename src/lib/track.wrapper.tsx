'use client';

import { count } from "console";
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
        countLike: 0,
        countPlay: 0,
        isPlaying: false,
        currentTime: -0,


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