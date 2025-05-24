'use client'

import { Alertpopup, Loader } from '@vibe-samurai/visual-ui-kit'

import { useGetFollowersQuery } from '@/entities/user/api/getUserFollowers.generated'
import { useRequiredUserId } from '@/shared/hooks/useRequiredUserId'

const formatDate = (dateStr: string | null | undefined) =>
  dateStr ? new Date(dateStr).toLocaleDateString('ru-RU') : '—'

export default function UserFollowers() {
  const { data, loading, error } = useGetFollowersQuery({
    variables: {
      userId: useRequiredUserId(),
      pageNumber: 1,
      pageSize: 100,
    },
  })

  if (loading) return <Loader />

  const followers = data?.getFollowers.items || []

  return (
    <>
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
            {followers.map(follower => (
              <tr key={follower.id} style={{ borderTop: '1px solid #333' }}>
                <td style={{ padding: '12px' }}>{follower.userId}</td>
                <td style={{ padding: '12px' }}>{follower.userName}</td>
                <td style={{ padding: '12px' }}>
                  <a
                    href={`/${follower.userName}`}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    style={{ color: '#4c9aff', textDecoration: 'underline' }}
                  >
                    {follower.userName}
                  </a>
                </td>
                <td style={{ padding: '12px' }}>{formatDate(follower.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <Alertpopup alertType={'error'} message={error.message} duration={5000} />}
    </>
  )
}
