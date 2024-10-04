'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import { TrackContext } from '@/lib/track.wrapper';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';
import { ConvertSlug } from '@/app/utils/api';
interface Iprops {
  id: number
  title: string,
  description: string,
  imgUrl: string
  url: string
}
export default function MediaControlCard(props: Iprops) {
  const theme = useTheme();
  const { currentTrack, setCurrentTrack } = React.useContext(TrackContext) as ITrackContext
  const handleClickForward = () => {
    setCurrentTrack({
      ...currentTrack,
      currentTime: 5
    })
  };

  const handleClickBack = () => {
    setCurrentTrack({
      ...currentTrack,
      currentTime: -5
    })
  };

  const handlePlay = () => {

    if (props.id != currentTrack.id) {
      setCurrentTrack({
        ...currentTrack,
        id: props.id,
        imgUrl: props.imgUrl,
        title: props.title,
        description: props.description,
        url: props.url,
        isPlaying: true
      })
    }
    else {
      setCurrentTrack({
        ...currentTrack,
        id: props.id,
        imgUrl: props.imgUrl,
        title: props.title,
        description: props.description,
        url: props.url,
        isPlaying: !currentTrack.isPlaying,
      })

    }

    console.log(currentTrack)


  }

  return (
    <Card sx={{ display: 'flex', justifyContent: "space-between" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', }}>

          <Link style={{ textDecoration: "none", color: 'black' }} href={`/track/${ConvertSlug(props.title)}-${props.id}.html`} >
            <Typography component="div" variant="h5">
              {props.title}
            </Typography>
          </Link>

          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {props.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton onClick={handleClickBack} aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton

            onClick={() => {

              handlePlay()
            }} aria-label="play/pause">
            {currentTrack.id == props.id && currentTrack.isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}

          </IconButton   >
          <IconButton onClick={handleClickForward} aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia

        component="img"
        sx={{ width: 200 }}
        // image="/static/images/cards/live-from-space.jpg"'

        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}upload/images/${props.imgUrl}`}
        alt="Live from space album cover"
      />
    </Card>
  );
}