'use client'

import { useParams } from 'next/navigation'

export default function UserPage() {
  const { userId } = useParams()

  return <div>User ID: {userId}</div>
}
