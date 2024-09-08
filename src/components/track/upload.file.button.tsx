import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSession } from 'next-auth/react';
import axios from 'axios';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
interface Iprops {
    setImgUrl?: (e: string) => void
    target: string
    setValue?: (v: number) => void;
    setTrackUpload?: (v: string) => void
    setPercent?: (v: number) => void
}

export default function InputFileUpload(props: Iprops) {
    const session = useSession()
    const handleUploadFile = async (e: FileList) => {
        const file = e[0];

        const formData = new FormData()
        formData.append("file", file)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/files/upload`,
            formData, {
            headers: {
                Authorization: `Bearer ${session.data?.access_token}`,
                "folder": props.target,

            },
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                if (props.setPercent) {
                    props.setPercent(percentCompleted)
                }

                console.log(percentCompleted)
            }

        }
        )

        if (res.data) {
            if (props.setImgUrl)
                props.setImgUrl(res.data.data.fileName);

            if (props.setTrackUpload)
                props.setTrackUpload(res.data.data.fileName)
            if (props.setValue)
                props.setValue(1)




        }

    }
    return (
        <Button onClick={(e) => { e.stopPropagation() }}

            component="label"
            role={undefined}
            variant="contained"
            tabIndex={2}
            startIcon={<CloudUploadIcon />}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleUploadFile(e.target.files!)}

            />
        </Button>
    );
}