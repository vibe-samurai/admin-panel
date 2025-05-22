'use client'

import { useGetFollowingQuery } from '@/entities/user/api/getUserFollowing.generated'

type Props = {
  userId: string
}

const formatDate = (dateStr: string | null | undefined) =>
  dateStr ? new Date(dateStr).toLocaleDateString('ru-RU') : '—'

export default function UserFollowing({ userId }: Props) {
  const { data, loading, error } = useGetFollowingQuery({
    variables: {
      userId: Number(userId),
      pageNumber: 1,
      pageSize: 100,
    },
  })

  if (loading) return <p>Loading following...</p>
  if (error) return <p>Error: {error.message}</p>

  const following = data?.getFollowing.items || []

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead style={{ background: '#1e1e1e', textAlign: 'left' }}>
          <tr>
            <th style={{ padding: '12px' }}>User ID</th>
            <th style={{ padding: '12px' }}>Username</th>
            <th style={{ padding: '12px' }}>Profile link</th>
            <th style={{ padding: '12px' }}>Subscription Date</th>
          </tr>
        </thead>
        <tbody>
          {following.map(followedUser => (
            <tr key={followedUser.id} style={{ borderTop: '1px solid #333' }}>
              <td style={{ padding: '12px' }}>{followedUser.userId}</td>
              <td style={{ padding: '12px' }}>{followedUser.userName}</td>
              <td style={{ padding: '12px' }}>
                <a
                  href={`/${followedUser.userName}`}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  style={{ color: '#4c9aff', textDecoration: 'underline' }}
                >
                  {followedUser.userName}
                </a>
              </td>
              <td style={{ padding: '12px' }}>{formatDate(followedUser.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
