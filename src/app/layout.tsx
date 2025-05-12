import type {Metadata} from 'next'

import React from 'react'

import './globals.scss'

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel Next App',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'en'}>
    <body>
    {children}
    </body>
    </html>
  )
}
