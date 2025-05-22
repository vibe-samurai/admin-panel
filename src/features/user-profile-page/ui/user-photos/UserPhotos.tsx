'use client'

import { useGetUserPhotosQuery } from '@/entities/user/api/getUserPhotos.generated'

import s from './UserPhotos.module.css'

type Props = {
  userId: string
}

export default function UserPhotos({ userId }: Props) {
  const { data, loading, error } = useGetUserPhotosQuery({
    variables: {
      userId: Number(userId),
      endCursorId: null,
    },
  })

  if (loading) return <div>Loading photos...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className={s.photosContainer}>
      {data?.getPostsByUser?.items?.map(photo => (
        <img key={photo.id} src={photo.url} alt={'User photo'} width={228} />
      ))}
    </div>
  )
}
