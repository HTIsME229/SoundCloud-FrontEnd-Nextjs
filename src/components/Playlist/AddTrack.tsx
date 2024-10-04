"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, Switch } from '@mui/material';
import { sendRequest } from '@/app/utils/api';
import { useSession } from 'next-auth/react';
import { useToast } from '@/app/utils/toast';
import SearchPlaylist from './SearchPlaylist';
import SearchTrack from './SearchTrack';
import { useRouter } from 'next/navigation';
interface Playlist {
    id: number,
    title: string,
    trackId: number[]
}


export default function AddTrack() {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("")
    const [isPublic, setIsPublic] = React.useState(true)
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const init = {
        id: 0,
        title: '',
        trackId: []
    }
    const [playlist, setPlaylist] = React.useState<Playlist>(init);
    const router = useRouter()
    const session = useSession()
    const toast = useToast()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<IPlaylist>>(
            {

                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists`,
                method: "PUT",
                body: {

                    title: playlist.title,
                    id: playlist.id,
                    tracks: playlist.trackId
                },
                headers: {
                    Authorization: `Bearer ${session.data?.access_token}`,

                }

            }
        )
        setPlaylist(init)
        if (res.data) {

            toast.success(res.message)
            setOpen(false)
            router.refresh()
            const revalidate = await sendRequest<any>(
                {

                    url: `http://localhost:3000/api/revalidate?tag=uploadPlaylist&secret=HTISME`,
                    method: "Post",

                }
            )

        }
        else {
            toast.error(res.message[0])
            setOpen(false)

        }

    }



    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Tracks
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Add New Track For Playlist</DialogTitle>
                <DialogContent>

                    <div style={{ display: 'flex', flexDirection: "column", gap: "20px", padding: '20px 20px' }}>
                        <SearchPlaylist setPlaylist={setPlaylist} playlist={playlist}></SearchPlaylist>
                        <SearchTrack setPlaylist={setPlaylist} playlist={playlist}></SearchTrack>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
