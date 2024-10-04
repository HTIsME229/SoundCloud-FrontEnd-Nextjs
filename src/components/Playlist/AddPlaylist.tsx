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
import { Router } from 'react-router-dom';
import { useRouter } from 'next/navigation';

export default function AddPlaylist() {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("")
    const [isPublic, setIsPublic] = React.useState(true)
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const session = useSession()
    const toast = useToast()
    const router = useRouter()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<IPlaylist>>(
            {

                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists/empty`,
                method: "Post",
                body: {
                    title: title,
                    isPublic: isPublic
                },
                headers: {
                    Authorization: `Bearer ${session.data?.access_token}`,

                }

            }
        )
        if (res.data) {

            toast.success(res.message)
            setOpen(false)
            router.refresh()
            // const revalidate = await sendRequest<any>(
            //     {

            //         url: `http://localhost:3000/api/revalidate?tag=uploadPlaylist&secret=HTISME`,
            //         method: "Post",

            //     }
            // )

        }
        else {
            toast.error(res.message[0])

        }


    }



    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Playlist
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Add New Playlist</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label=" Title"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <FormControlLabel control={<Switch defaultChecked onChange={() => { setIsPublic(!isPublic) }} />} label={isPublic ? "Public" : 'Private'} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
