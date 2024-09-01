'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignIn() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errPass, setErrPass] = useState(false)
    const [errName, setErrName] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const handleSubmit = () => {
        if (userName == "")
            setErrName(true)
        else setErrName(false)
        if (password == "") setErrPass(true)
        else setErrPass(false)
        if (!errName || !errPass) {
            console.log(userName)
            console.log(password)
        }



    }
    return (
        <>
            <Container sx={{ textAlign: "center ", marginTop: "100px" }}>
                <LockIcon></LockIcon>
                < h1 style={{ margin: "0 5px   ", marginBottom: '50px' }}>Sign in</h1>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: "50%", marginBottom: "20px" } }}
                    noValidate
                    autoComplete="off"
                >



                    <TextField error={errName} helperText={errName ? "username not empty " : ""} onChange={(e) => { setUserName(e.target.value) }} sx={{ width: "100%", }} id="outlined-basic" label="UserName" name='userName' variant="outlined" />


                    <TextField InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setIsShow(!isShow)} edge="end">
                                    {isShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                        error={errPass} helperText={errPass ? "Password not empty " : ""} onChange={(e) => { setPassword(e.target.value) }} type={isShow ? "text" : "password"} sx={{ width: "100%" }} id="filled-basic" label="Password " variant="filled" >

                    </TextField>



                    <Button onClick={() => handleSubmit()} variant="contained">Login</Button>

                </Box>

                <Divider sx={{ width: '50%', margin: '10px auto' }}>Or Using</Divider>

                <GitHubIcon sx={{ width: '50px', height: "50px", marginRight: "50px" }}></GitHubIcon>
                <GoogleIcon sx={{ width: '50px', height: "50px" }}></GoogleIcon>

            </Container >
        </>
    );
}

