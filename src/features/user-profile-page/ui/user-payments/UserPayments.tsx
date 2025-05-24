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

import { useGetPaymentsByUserQuery } from '@/entities/user/api/getUserPayments.generated'
import { useRequiredUserId } from '@/shared/hooks/useRequiredUserId'
import { formatDate } from '@/shared/lib/formatDate'
import { formatPaymentMethod } from '@/shared/lib/formatPaymentMethod'
import { formatSubscriptionType } from '@/shared/lib/formatSubscriptionType'

import s from './UserPayments.module.css'

const ROWS_PER_PAGE = [8, 25, 100]

const columns: Column[] = [
  { key: 'dateOfPayment', title: 'Date of Payment' },
  { key: 'endDate', title: 'End date of subscription' },
  { key: 'price', title: 'Amount, $' },
  { key: 'type', title: 'Subscription Type' },
  { key: 'paymentType', title: 'Payment Type' },
]

export default function UserPayments() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0])

  const { data, loading, error } = useGetPaymentsByUserQuery({
    variables: {
      userId: useRequiredUserId(),
      pageNumber: currentPage,
      pageSize: rowsPerPage,
    },
  })

  if (loading) return <Loader />

  const payments = data?.getPaymentsByUser.items || []
  const totalCount = data?.getPaymentsByUser.totalCount || 0
  const totalPages = Math.ceil(totalCount / rowsPerPage)

  return (
    <>
      {payments.length ? (
        <>
          <Table.Root className={s.tableRoot}>
            <TableHeader columns={columns} />
            <Table.Body>
              {payments.map(payment => (
                <Table.Row key={payment.id} className={s.tableRow}>
                  <Table.Cell>{formatDate(payment.dateOfPayment)}</Table.Cell>
                  <Table.Cell>{formatDate(payment.endDate)}</Table.Cell>
                  <Table.Cell>${payment.price}</Table.Cell>
                  <Table.Cell>{formatSubscriptionType(payment.type)}</Table.Cell>
                  <Table.Cell>{formatPaymentMethod(payment.paymentType)}</Table.Cell>
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
        <div>Платежей пока нет</div>
      )}

      {error && <Alertpopup alertType={'error'} message={error.message} duration={5000} />}
    </>
  )
}
