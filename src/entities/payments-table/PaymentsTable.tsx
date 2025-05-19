'use client'

import type { SortBy } from './model/types/types'

import { Loader, Pagination } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import { useState } from 'react'

import DefaultAvatar from 'public/icons/defaultAvatar.svg'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { useToggleSort } from '@/entities/payments-table/model/hooks/useToggleSort'
import { selectSearchValue } from '@/features/search-input/model/selectors/selectSearch'
import { SortButton } from '@/shared/components/SortButton/SortButton'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { formatDate } from '@/shared/lib/formatDate'
import { formatPaymentMethod } from '@/shared/lib/formatPaymentMethod'
import { formatSubscriptionType } from '@/shared/lib/formatSubscriptionType'

import { useGetPaymentsQuery } from './api/Payments.generated'
import { selectOnRowsPerPage } from './model/selectors/selectOnRowsPerPage'
import { selectSortBy } from './model/selectors/selectSortBy'
import { selectSortDirection } from './model/selectors/selectSortDicrection'
import { setOnRowsPerPageChange } from './model/slices/paymentsSlice'
import s from './PaymentsTable.module.scss'

export const PaymentsTable = () => {
  const ROWS_PER_PAGE = [8, 25, 100]
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useAppDispatch()
  const onRowsPerPage = useAppSelector(selectOnRowsPerPage)
  const sortBy = useAppSelector(selectSortBy)
  const sortDirection = useAppSelector(selectSortDirection)

  const searchValue = useAppSelector(selectSearchValue)
  const { data, loading } = useGetPaymentsQuery({
    variables: {
      pageSize: onRowsPerPage,
      pageNumber: currentPage,
      sortBy,
      sortDirection,
      searchTerm: searchValue,
    },
  })
  const payments = data?.getPayments.items

  const totalPages = data ? Math.ceil(data.getPayments.totalCount / onRowsPerPage) : 1

  const toggleSort = useToggleSort()

  const onSortClickHandler = (field: SortBy) => {
    toggleSort(field)
    setCurrentPage(1)
  }

  if (loading) return <Loader />

  return (
    <>
      {payments?.length ? (
        <div>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.headerCell}>
                  {' '}
                  UserName{' '}
                  <SortButton field={'userName'} onClick={() => onSortClickHandler('userName')} />
                </th>
                <th className={s.headerCell}>
                  Date added{' '}
                  <SortButton field={'createdAt'} onClick={() => onSortClickHandler('createdAt')} />
                </th>
                <th className={s.headerCell}>
                  Amount, ${' '}
                  <SortButton field={'amount'} onClick={() => onSortClickHandler('amount')} />
                </th>
                <th>Subscription</th>
                <th className={s.headerCell}>
                  Payment Method{' '}
                  <SortButton
                    field={'paymentMethod'}
                    onClick={() => onSortClickHandler('paymentMethod')}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => {
                return (
                  <tr key={payment.id}>
                    <td className={s.usernameCell}>
                      {' '}
                      <Image
                        style={{ borderRadius: '50%' }}
                        src={payment.avatars?.[0]?.url ?? DefaultAvatar}
                        width={36}
                        height={36}
                        alt={'user avatar'}
                      />
                      {payment.userName}
                    </td>
                    <td>{formatDate(payment.createdAt)}</td>
                    <td>
                      {payment.amount}
                      {formatCurrency(payment.currency ?? '')}
                    </td>
                    <td>{formatSubscriptionType(payment.type)}</td>
                    <td>{formatPaymentMethod(payment.paymentMethod)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className={s.pagination}>
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
              // rowsPerPage={onRowsPerPage}
              rowsPerPageOptions={ROWS_PER_PAGE}
              onRowsPerPageChange={newRows => {
                dispatch(setOnRowsPerPageChange(newRows))
                setCurrentPage(1)
              }}
            />
          </div>
        </div>
      ) : (
        <div>Подписок пока нет</div>
      )}
    </>
  )
}
