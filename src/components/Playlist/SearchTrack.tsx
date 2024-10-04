"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/app/utils/api';
import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Console } from 'console';
interface Playlist {
    id: number,
    title: string,
    trackId: number[]
}
interface Iprops {
    setPlaylist: (e: Playlist) => void
    playlist: Playlist
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function SearchTrack(prop: Iprops) {
    const [title, setTitle] = React.useState<string>("");
    const [data, setData] = React.useState<ITrack[]>([]);
    const [trackId, setTrackId] = React.useState<number[]>([])
    const session = useSession()
    const fetchData = async () => {
        const res = await sendRequest<IBackendRes<IModelPaginate<ITrack>>>(
            {

                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks`,
                method: "get",
                queryParams: {
                    title: title,
                    page: 1,
                    size: 5
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
            multiple
            id="checkboxes-tags-demo"
            options={data}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            onChange={(e, newValue) => {
                newValue.map(e => {

                    // const check = prop.playlist?.trackId.some(trackId => { e.id == trackId });
                    {

                        prop?.setPlaylist({
                            ...prop?.playlist,
                            trackId: [...prop.playlist.trackId, e.id]
                        })
                    }
                })
            }}
            renderOption={(props, option, { selected }) => {
                const { ...optionProps } = props;
                return (
                    <li  {...optionProps}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.title}
                    </li>
                );
            }}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField onChange={(e) => { setTitle(e.target.value) }} {...params} label="Track" placeholder="Favorites" />
            )}
        />
    );
}



