"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/app/utils/api';
import { Checkbox, Stack } from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Playlist from './playlist';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface Playlist {
    id: number,
    title: string,
    trackId: number[]
}
interface Iprops {
    setPlaylist: (e: Playlist) => void
    playlist: Playlist | undefined
}
export default function SearchPlaylist(prop: Iprops) {
    const [title, setTitle] = React.useState<string>();
    const [data, setData] = React.useState<IPlaylist[]>([]);
    const session = useSession()
    const fetchData = async () => {
        const res = await sendRequest<IBackendRes<IModelPaginate<IPlaylist>>>(
            {
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists/by-user`,
                method: "get",
                queryParams: {
                    title: title,
                    page: 0,
                    size: 10
                },
                headers: {
                    Authorization: `Bearer ${session.data?.access_token}`,

                }


            }

        )
        if (res.data) {
            setData(res?.data?.result)
        }
    }

    React.useEffect(() => {

        fetchData()
    }, [title])

    return (


        <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable


            options={data} // Dùng toàn bộ đối tượng Playlist
            // @ts-ignore
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => {

                if (prop.playlist && prop.setPlaylist && newValue)
                    // @ts-ignore
                    prop.setPlaylist({ ...prop.playlist, title: newValue.title, id: newValue.id })
            }}
            renderInput={(params) => (
                <TextField
                    onChange={(e) => { setTitle(e.target.value) }}
                    {...params}
                    label="Playlist"

                />
            )}
        />

    );
}



