'use client'

import type { ReactNode } from 'react'

import { Loader } from '@vibe-samurai/visual-ui-kit'
import { use } from 'react'

import { useGetUserQuery } from '@/entities/user/api/getUser.generated'
import { UserProfileHeader } from '@/features/user-profile-page/ui/user-profile-header/UserProfileHeader'

import s from './UserProfileLayout.module.scss'

type Props = {
  children: ReactNode
  params: Promise<{ userId: string }>
}

export default function UserProfileLayout({ children, params }: Props) {
  const { userId } = use(params)
  const { data, loading } = useGetUserQuery({ variables: { userId: Number(userId) } })
  const user = data?.getUser

  if (loading || !user) return <Loader />

  return (
    <div className={s.content}>
      <UserProfileHeader user={user} />
      {children}
    </div>
  )
}
