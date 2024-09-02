'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, SlideProps, Snackbar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signIn } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';



export default function SignIn() {
    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="down" />;
    }
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errPass, setErrPass] = useState(false)
    const [errName, setErrName] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [open, setOpen] = useState(false);


    const router = useRouter()
    const handleSubmit = async () => {

        if (userName == "")
            setErrName(true)
        if (password == "") setErrPass(true)

        if (!errName || !errPass) {
            const result = await signIn("credentials", {
                redirect: false,
                username: userName,
                password,
            });

            if (result?.error) {
                setOpen(true)
            }
            else
                router.push("/")




        }




    }
    return (
        <>

            <Grid container
                item xs={12} sm={8} md={5} lg={4}
                sx={{ margin: '100px auto', display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "50px 50px", background: "whitesmoke" }} >

                <div style={{ textAlign: "center" }}>
                    <LockIcon></LockIcon>
                    < h1 style={{ margin: "0 5px   ", marginBottom: '50px' }}>Sign in</h1>
                </div>
                <Snackbar
                    open={open}

                    autoHideDuration={5000}
                    onClose={() => setOpen(false)}
                    TransitionComponent={SlideTransition}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Vị trí góc dưới bên phải
                >
                    <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                        UserName or Password Incorrect
                    </Alert>
                </Snackbar>
                <Box onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit()
                    }

                }}
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: "100%", marginBottom: "20px", margin: "0 auto" } }}
                    noValidate
                    autoComplete="off"
                >


                    <div style={{ display: "flex", flexDirection: "column", gap: '20px' }} >
                        <TextField error={errName} helperText={errName ? "username not empty " : ""} onChange={(e) => {
                            setUserName(e.target.value)
                            setErrName(false)
                        }} sx={{ width: "100%", }} id="outlined-basic" label="UserName" name='userName' variant="outlined" />

                        <TextField InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setIsShow(!isShow)} edge="end">
                                        {isShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                            error={errPass} helperText={errPass ? "Password not empty " : ""} onChange={(e) => {
                                setPassword(e.target.value)
                                setErrPass(false)
                            }} type={isShow ? "text" : "password"} sx={{ width: "100%" }} id="filled-basic" label="Password " variant="filled" >

                        </TextField>
                    </div>





                    <Button sx={{ width: "100%" }} onClick={() => handleSubmit()} variant="contained">Login</Button>

                </Box>


                <div>
                    <Divider sx={{ width: '100%', margin: '10px auto' }}>Or Using</Divider>
                    <span onClick={() => signIn("github")}><GitHubIcon sx={{ width: '50px', height: "50px", marginRight: "50px", cursor: "pointer" }}></GitHubIcon></span>
                    <GoogleIcon sx={{ width: '50px', height: "50px" }}></GoogleIcon>
                </div>

            </Grid>

        </>
    );
}

