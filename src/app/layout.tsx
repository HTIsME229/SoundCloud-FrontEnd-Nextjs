
import * as React from 'react';
import AppHeader from "@/components/header/app.header";
import MainFooter from '@/components/footer/main.footer';
import { Box } from '@mui/material';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { useState } from 'react';
import { SessionProvider } from "next-auth/react"
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { ToastProvider } from './utils/toast';
import { TrackContextProvider } from '@/lib/track.wrapper';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const [showFooter, setShowFooter] = useState(true)
  return (
    <html lang="en">
      <body style={{ height: '100vh' }}>
        <ThemeRegistry>
          <NextAuthWrapper >
            <ToastProvider>
              <TrackContextProvider>
                {children}
              </TrackContextProvider>

            </ToastProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
