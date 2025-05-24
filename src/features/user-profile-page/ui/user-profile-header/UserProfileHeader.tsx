'use client'

import { Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { GetUserQuery } from '@/entities/user/api/getUser.generated'

import s from './UserProfileHeader.module.css'

type Props = {
  user: GetUserQuery['getUser']
}

export const UserProfileHeader = ({ user }: Props) => {
  const initialUrl = user?.profile.avatars?.[0]?.url
  const fallbackUrl = '/images/default-avatar.svg'
  const [imgSrc, setImgSrc] = useState(initialUrl || fallbackUrl)

  useEffect(() => {
    setImgSrc(initialUrl || fallbackUrl)
  }, [initialUrl])

  const router = useRouter()
  const buttonHandler = () => {
    router.push('/users')
  }

  return (
    <>
      <button type={'button'} onClick={buttonHandler} className={s.button}>
        Back to Users List
      </button>

      <div className={s.userInfoHeader}>
        <Image
          src={imgSrc}
          alt={'Avatar'}
          width={60}
          height={60}
          className={s.avatar}
          onError={() => setImgSrc(fallbackUrl)}
          priority
        />

        <div className={s.userNameBlock}>
          <Typography variant={'h2'}>
            {user.profile.firstName} {user.profile.lastName}
          </Typography>
          <Typography variant={'regular-text-14'} style={{ textDecoration: 'underline' }}>
            {user.userName}
          </Typography>
        </div>
      </div>

      <div className={s.metaInfo}>
        <div className={s.column}>
          <Typography variant={'regular-text-14'} style={{ color: '#8D9094' }}>
            UserID
          </Typography>
          <Typography variant={'regular-text-16'}>{user.id}</Typography>
        </div>

        <div className={s.column}>
          <Typography variant={'regular-text-14'} style={{ color: '#8D9094' }}>
            Profile Creation Date
          </Typography>
          <Typography variant={'regular-text-16'}>
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : '–'}
          </Typography>
        </div>
      </div>
    </>
  )
}
