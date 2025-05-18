'use client'

import { Loader, Pagination } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import { useState } from 'react'

import DefaultAvatar from 'public/icons/defaultAvatar.svg'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { formatDate } from '@/shared/lib/formatDate'
import { formatPaymentMethod } from '@/shared/lib/formatPaymentMethod'
import { formatSubscriptionType } from '@/shared/lib/formatSubscriptionType'

import { useGetPaymentsQuery } from './api/Payments.generated'
import { selectOnRowsPerChange } from './model/selectors/selectOnRowsPerPage'
import { setOnRowsPerPageChange } from './model/slices/paymentsPaginationSlice'
import s from './PaymentsTable.module.scss'
export const PaymentsTable = () => {
    const ROWS_PER_PAGE = [8, 25, 100]
    const dispatch = useAppDispatch()
    const onRowsPerPageChange = useAppSelector(selectOnRowsPerChange)
    const [currentPage, setCurrentPage] = useState(1)
    const { data, loading } = useGetPaymentsQuery({variables: {pageSize: onRowsPerPageChange, pageNumber: currentPage}})
    const payments = data?.getPayments.items;
    const totalPages = data ? Math.ceil(data.getPayments.totalCount / onRowsPerPageChange) : 1

    if (loading) return <Loader />
  
    return (
      <>
        {payments?.length ? (
          <div>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Date added</th>
                  <th>Amount, $</th>
                  <th>Subscription</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => {
                  return (
                    <tr key={payment.id}>
                          <td className={ s.usernameCell}> <Image style={{borderRadius: '50%'}} src={payment.avatars?.[0]?.url ?? DefaultAvatar} width={36} height={36} alt={"user avatar"}/>
                              {payment.userName}</td>
                      <td>{formatDate(payment.createdAt)}</td>
                          <td>{payment.amount}{ formatCurrency(payment.currency?? '' )}</td>
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
                rowsPerPage={onRowsPerPageChange}
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

