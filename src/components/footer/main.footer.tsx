"use client"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppBar, Box, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHasMounted } from '@/app/utils/cutomhook';
import { useContext, useEffect, useRef } from 'react';
import test from 'node:test';
import { TrackContext } from '@/lib/track.wrapper';
const MainFooter = (props: any) => {
  const { currentTrack, setCurrentTrack } = useContext(TrackContext) as ITrackContext
  const audioPlayerRef = useRef<any>(null);


  const audioEl = audioPlayerRef.current?.audio?.current;
  useEffect(() => {
    if (audioEl) {

      if (currentTrack.isPlaying) {

        audioEl.play();

        // Phát nhạc nếu isPlaying là true
      } else {
        audioEl.pause(); // Dừng nhạc nếu isPlaying là false
      }
      // let tmp = audioEl.currentTime

      audioEl.currentTime = audioEl.currentTime + currentTrack.currentTime
      setCurrentTrack({
        ...currentTrack,
        currentTime: 0

      })

    }


  }, [currentTrack.isPlaying, currentTrack.currentTime]);
  const hasMouted = useHasMounted();
  if (!hasMouted) return (<></>)
  return (
    <>
      {currentTrack && currentTrack.id &&

        <AppBar position='fixed' sx={{
          " .rhap_main": {
            gap: "50px"
          }, display: "flex", justifyContent: 'space-between', flexDirection: "row", gap: "50px",
          bottom: "0", top: "auto", background: "#fff"
        }} >

          <AudioPlayer
            ref={audioPlayerRef}
            style={{ boxShadow: "none", width: "99%", }}
            layout='horizontal-reverse'
            onPause={(e) => {
              console.log("check pa")
              setCurrentTrack({ ...currentTrack, isPlaying: false })
            }
            }
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/TrackAudio/${currentTrack.url}`}
            onPlay={e => {
              console.log("check st")
              setCurrentTrack({ ...currentTrack, isPlaying: true, wavesurfer: false })
            }
            }
            autoPlay
          // autoPlayAfterSrcChange={false}



          />

          {/* <div style={{ color: "black" }}>
        <span onClick={() => props.setShowFooter(false)}><CloseIcon sx={{ position: "absolute", top: "0", right: "2px", zIndex: "10" }} ></CloseIcon></span>
      </div> */}

          <div style={{ color: "black", width: "10%", }}>
            <div style={{ overflow: 'hidden', textOverflow: "ellipsis" }} >{currentTrack.title}</div>
            <div style={{ overflow: 'hidden', textOverflow: "ellipsis" }}>{currentTrack.description}</div>
          </div>

        </AppBar>
      }
    </>


  )
}
export default MainFooter