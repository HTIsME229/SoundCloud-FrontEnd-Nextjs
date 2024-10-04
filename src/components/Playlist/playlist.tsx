'use client'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Box, Container, Divider } from '@mui/material';
import AddPlaylist from './AddPlaylist';
import AddTrack from './AddTrack';
import { TrackContext } from '@/lib/track.wrapper';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
interface IProps {
    listPlaylist: IModelPaginate<IPlaylistByUser> | undefined

}
const Playlist = (props: IProps) => {

    const { currentTrack, setCurrentTrack } = React.useContext(TrackContext) as ITrackContext
    const [playlist, setPlaylist] = React.useState<IPlaylistByUser[]>()

    const handlePlay = (url: string, id: number) => {
        if (currentTrack.id != id) {
            setCurrentTrack({
                ...currentTrack,
                id: id,
                url: url,
                isPlaying: true
            })
        }
        else {
            setCurrentTrack({
                ...currentTrack,
                id: id,
                url: url,
                isPlaying: !currentTrack.isPlaying
            })
        }

    }




    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ padding: '50px 50px', background: 'whitesmoke' }}>
                <div style={{ marginBottom: "10px", display: "flex", justifyContent: "end", gap: "10px", }}>

                    <AddPlaylist ></AddPlaylist>
                    <AddTrack></AddTrack>
                </div>
                <Divider sx={{ background: "black", margin: '20px 10px' }}></Divider>

                <div>

                    {props.listPlaylist && props.listPlaylist.result.map((e) => {
                        return (
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        {e.title}
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        {e.tracks && e.tracks.map((item) => {
                                            return (

                                                <div style={{ display: "flex", width: "100%", justifyContent: "space-between ", marginBottom: "10px" }}>
                                                    <div>{item.title}</div>
                                                    <button onClick={() => handlePlay(item.url, item.id)} >{currentTrack.id == item.id && currentTrack.isPlaying ? <PauseIcon sx={{ height: 15, width: 15 }} /> : <PlayArrowIcon sx={{ height: 15, width: 15 }} />}
                                                    </button>

                                                </div>
                                            )
                                        })}
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        )
                    })}


                </div>

            </Box>
        </Container>

    )
}
export default Playlist