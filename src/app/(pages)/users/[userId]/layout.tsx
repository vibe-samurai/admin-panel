'use client'

import { Loader } from '@vibe-samurai/visual-ui-kit'
import React, { type ReactNode, use, useEffect } from 'react'

import { useAppDispatch } from '@/app/store/store'
import { useGetUserQuery } from '@/entities/user/api/getUser.generated'
import { setUserId } from '@/entities/user/model/slices/userSlice'
import { UserProfileHeader } from '@/features/user-profile-page/ui/user-profile-header/UserProfileHeader'

import s from './UserProfileLayout.module.scss'

type Props = {
  children: ReactNode
  params: Promise<{ userId: string }>
}

export default function UserProfileLayout({ children, params }: Props) {
  const { userId } = use(params)
  const { data, loading, error } = useGetUserQuery({ variables: { userId: Number(userId) } })
  const user = data?.getUser
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setUserId(Number(userId)))
  }, [dispatch, userId])

  if (loading || !user) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className={s.content}>
      <UserProfileHeader user={user} />
      {children}
    </div>
  )
}
