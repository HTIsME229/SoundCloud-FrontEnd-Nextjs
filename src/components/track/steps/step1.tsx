'use client'
import React, { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import "./theme.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import InputFileUpload from '../upload.file.button';
import { sendRequest, sendRequestFile } from '@/app/utils/api';
import { useSession } from 'next-auth/react';
import axios from 'axios';
interface Iprops {
    setValue: (v: number) => void;
    setTrackUpload: (v: string) => void
    setPercent: (v: number) => void;
}
const Step1 = (props: Iprops) => {
    const session = useSession()


    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles) {
            props.setValue(1)
            const audio = acceptedFiles[0]

            const formData = new FormData()
            formData.append("file", audio)


            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/files/upload`,
                formData, {
                headers: {
                    Authorization: `Bearer ${session.data?.access_token}`,
                    "folder": "TrackAudio",

                },
                onUploadProgress: progressEvent => {
                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                    props.setPercent(percentCompleted)
                }

            }
            )
            if (res.data) {
                props.setTrackUpload(res.data.data.fileName)
            }

        }

        console.log(acceptedFiles)
    }, [session])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio': [".mp3"]
        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));



    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <InputFileUpload></InputFileUpload>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}
export default Step1