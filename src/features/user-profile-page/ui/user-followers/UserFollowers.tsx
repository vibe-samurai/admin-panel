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

import { useGetFollowersQuery } from '@/entities/user/api/getUserFollowers.generated'
import { useRequiredUserId } from '@/shared/hooks/useRequiredUserId'
import { formatDate } from '@/shared/lib/formatDate'

import s from './UserFollowers.module.css'

const ROWS_PER_PAGE = [8, 25, 100]

const columns: Column[] = [
  { key: 'userId', title: 'User ID' },
  { key: 'userName', title: 'Username' },
  { key: 'profileLink', title: 'Profile link' },
  { key: 'subscriptionDate', title: 'Subscription Date' },
]

export default function UserFollowers() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0])

  const { data, loading, error } = useGetFollowersQuery({
    variables: {
      userId: useRequiredUserId(),
      pageNumber: currentPage,
      pageSize: rowsPerPage,
    },
  })

  if (loading) return <Loader />

  const followers = data?.getFollowers.items || []
  const totalCount = data?.getFollowers.totalCount || 0
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage))

  return (
    <>
      {followers.length ? (
        <>
          <Table.Root className={s.tableRoot}>
            <TableHeader columns={columns} />
            <Table.Body>
              {followers.map(follower => (
                <Table.Row key={follower.id} className={s.tableRow}>
                  <Table.Cell>{follower.userId}</Table.Cell>
                  <Table.Cell>{follower.userName}</Table.Cell>
                  <Table.Cell className={s.tableCell}>
                    <a
                      href={`/users/${follower.userId}`}
                      target={'_blank'}
                      rel={'noopener noreferrer'}
                      title={`Go to ${follower.userName} profile`}
                    >
                      {follower.userName}
                    </a>
                  </Table.Cell>
                  <Table.Cell>{formatDate(follower.createdAt)}</Table.Cell>
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
        <div>Подписчиков пока нет</div>
      )}

      {error && <Alertpopup alertType={'error'} message={error.message} duration={5000} />}
    </>
  )
}
