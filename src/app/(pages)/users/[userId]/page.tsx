'use client'

import { useParams } from 'next/navigation'

import UserProfilePage from '@/features/user-profile-page/ui/UserProfilePage'

export default function Page() {
  const params = useParams()
  const userId = params?.userId as string

  return <UserProfilePage userId={userId} />
}
