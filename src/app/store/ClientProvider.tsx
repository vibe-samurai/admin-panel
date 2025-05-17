'use client'

import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store/store'
import ApolloClientProvider from '@/shared/providers/ApolloClientProvider'

import s from './ClientProvider.module.scss'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.container}>
      <ApolloClientProvider>
        <Provider store={store}>{children}</Provider>
      </ApolloClientProvider>
    </div>
  )
}
