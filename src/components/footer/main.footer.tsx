"use client"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppBar, Box, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHasMounted } from '@/app/utils/cutomhook';
import { useEffect } from 'react';
import test from 'node:test';
const MainFooter = (props: any) => {


  console.log(" check ", process.env.NEXT_PUBLIC_BACKEND_URL)


  const hasMouted = useHasMounted();
  if (!hasMouted) return (<></>)
  return (
    <AppBar position='fixed' sx={{ bottom: "0", top: "auto", background: "#fff" }} >

      <AudioPlayer
        style={{ boxShadow: "none", width: "99%", }}

        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/TrackAudio/1724498742351-VuaHanVuaYeu-TrungTu-15121915.mp3`}
        onPlay={e => console.log("onPlay")}

      />
      <div style={{ color: "black" }}>


        <span onClick={() => props.setShowFooter(false)}><CloseIcon sx={{ position: "absolute", top: "0", right: "2px", zIndex: "10" }} ></CloseIcon></span>
      </div>



    </AppBar>


  )
}
export default MainFooter