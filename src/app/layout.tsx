"use client"
import * as React from 'react';
import AppHeader from "@/components/header/app.header";
import MainFooter from '@/components/footer/main.footer';
import { Box } from '@mui/material';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { useState } from 'react';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showFooter, setShowFooter]=useState(true)
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
    <AppHeader></AppHeader>
         {children}
         <Box sx={{position:"sticky",bottom:"0",zIndex:"2",width:"100%",}}>  
         {showFooter&&<MainFooter setShowFooter={setShowFooter} >
          
          </MainFooter>}
           
   
           </Box>
    
        </ThemeRegistry>
      </body>
    </html>
  );
}
