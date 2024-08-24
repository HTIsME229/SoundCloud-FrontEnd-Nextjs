"use client"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Box,Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHasMounted } from '@/app/utils/cutomhook';
import { useEffect } from 'react';
import test from 'node:test';
const MainFooter=(props:any)=>{
  




    const hasMouted=useHasMounted(  );
    if(!hasMouted)return(<></>)
    return(
   <Container sx={{display:"flex",backgroundColor:"#FFF",gap:'50px',boxShadow:"0 0 3px 0 rgba(0, 0, 0, 0.2)",position:"relative"}}>
        <AudioPlayer  
        style={{boxShadow:"none"}}  
        // autoPlay
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp"
        onPlay={e => console.log("onPlay")}   

      />
      <div>
      <div style={{color:"grey"}}>Eric</div>
        <div><pre>Who Am I ?</pre></div> 
        <span onClick={()=>props.setShowFooter(false)}><CloseIcon sx={{position:"absolute",top:"0",right:"0"}} ></CloseIcon></span>
      </div>
      

   </Container>

 
    
    )
}
export default MainFooter