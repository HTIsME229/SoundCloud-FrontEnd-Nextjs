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
        currentTime: -0


    }

    const [currentTrack, setCurrentTrack] = useState<IShareTrack>(
        initValue
    )


    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </TrackContext.Provider>
    )
};

// export const useThemeContext = () => useContext(TrackContext);