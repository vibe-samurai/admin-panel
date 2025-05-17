import type { Metadata } from 'next'

import React from 'react'

import './globals.scss'
import ClientProvider from '@/app/store/ClientProvider'
import { AuthChecker } from '@/features/auth/ui/auth-checker/AuthChecker'
import { MainHeader } from '@/widgets/main-header/MainHeader'
import { SideNavBar } from '@/widgets/side-nav-bar/SideNavBar'

import s from './layout.module.scss'

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
        <ClientProvider>
          <AuthChecker />
          <MainHeader />
          <SideNavBar />
          <div className={s.content}>{children}</div>
        </ClientProvider>
      </body>
    </html>
  )
}
