'use client'

import { Alertpopup, Loader } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import React from 'react'

import { useGetUserPhotosQuery } from '@/entities/user/api/getUserPhotos.generated'
import { useRequiredUserId } from '@/shared/hooks/useRequiredUserId'

import s from './UserPhotos.module.css'

export default function UserPhotos() {
  const { data, loading, error } = useGetUserPhotosQuery({
    variables: {
      userId: useRequiredUserId(),
      endCursorId: null,
    },
  })

  if (loading) return <Loader />

  return (
    <>
      <div className={s.photosContainer}>
        {data?.getPostsByUser?.items?.map(photo => (
          <Image
            key={photo.id}
            src={photo.url as string}
            width={228}
            height={228}
            alt={'#'}
            priority
          />
        ))}
      </div>
      {error && <Alertpopup alertType={'error'} message={error.message} duration={5000} />}
    </>
  )
}
