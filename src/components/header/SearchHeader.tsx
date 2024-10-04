"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/app/utils/api';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

interface Playlist {
    id: number,
    title: string,
    trackId: number[]
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function SearchHeader() {
    const [title, setTitle] = React.useState<string>("");
    const [data, setData] = React.useState<ITrack[]>([]);
    const router = useRouter()

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
        <>


            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={data.map((option) => option.title)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setTitle((e.target as HTMLInputElement).value)
                        if (title != "")
                            router.push(`/search?q=${title}`)
                    }
                }}
                sx={{
                    width: "40%",

                }}
                renderInput={(params) => (
                    <TextField
                        {...params}

                        onChange={(e) => setTitle(e.target.value)} {...params} label={<SearchIcon />}

                    />
                )}
            />

        </>
    );

}



