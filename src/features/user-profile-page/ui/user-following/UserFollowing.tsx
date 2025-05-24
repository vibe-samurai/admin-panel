'use client'

import {
  Alertpopup,
  type Column,
  Loader,
  Pagination,
  Table,
  TableHeader,
} from '@vibe-samurai/visual-ui-kit'
import React, { useState } from 'react'

import { useGetFollowingQuery } from '@/entities/user/api/getUserFollowing.generated'
import { useRequiredUserId } from '@/shared/hooks/useRequiredUserId'
import { formatDate } from '@/shared/lib/formatDate'

import s from './UserFollowing.module.css'

const ROWS_PER_PAGE = [8, 25, 100]

const columns: Column[] = [
  { key: 'userId', title: 'User ID' },
  { key: 'userName', title: 'Username' },
  { key: 'profileLink', title: 'Profile link' },
  { key: 'subscriptionDate', title: 'Subscription Date' },
]

export default function UserFollowing() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0])

  const { data, loading, error } = useGetFollowingQuery({
    variables: {
      userId: useRequiredUserId(),
      pageNumber: currentPage,
      pageSize: rowsPerPage,
    },
  })

  if (loading) return <Loader />

  const following = data?.getFollowing.items || []
  const totalCount = data?.getFollowing.totalCount || 0
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage))

  return (
    <>
      {following.length ? (
        <>
          <Table.Root className={s.tableRoot}>
            <TableHeader columns={columns} />
            <Table.Body>
              {following.map(followedUser => (
                <Table.Row key={followedUser.id} className={s.tableRow}>
                  <Table.Cell>{followedUser.userId}</Table.Cell>
                  <Table.Cell>{followedUser.userName}</Table.Cell>
                  <Table.Cell className={s.tableCell}>
                    <a
                      href={`/users/${followedUser.userId}`}
                      target={'_blank'}
                      rel={'noopener noreferrer'}
                      title={`Go to ${followedUser.userName} profile`}
                    >
                      {followedUser.userName}
                    </a>
                  </Table.Cell>
                  <Table.Cell>{formatDate(followedUser.createdAt)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <div className={s.pagination}>
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
              rowsPerPageOptions={ROWS_PER_PAGE}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <div>Подписок пока нет</div>
      )}

      {error && <Alertpopup alertType={'error'} message={error.message} duration={5000} />}
    </>
  )
}
