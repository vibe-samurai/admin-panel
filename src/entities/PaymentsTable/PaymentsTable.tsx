'use client'

import { Loader, Pagination } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'

import DefaultAvatar from 'public/icons/defaultAvatar.svg'

import { useGetPaymentsQuery } from './api/Payments.generated'
import s from './PaymentsTable.module.scss'
export const PaymentsTable = () => {
    const ROWS_PER_PAGE = [8, 25, 100]
  
    const { data, loading } = useGetPaymentsQuery()
    const payments = data?.getPayments.items;

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
                    <td> <Image  src={payment.avatars?.[0]?.url ?? DefaultAvatar} width={36} height={36} alt={"user avatar"}/>
                              {payment.userName}</td>
                      <td>{(payment.createdAt)}</td>
                      <td>{(payment.amount)}</td>
                      <td>{(payment.type)}</td>
                      <td>{(payment.paymentMethod)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={s.pagination}>
              {/* <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
                rowsPerPageOptions={ROWS_PER_PAGE}
                onRowsPerPageChange={newRows => {
                  onRowsPerPageChangeHandler(newRows)
                }}
              /> */}
            </div>
          </div>
        ) : (
          <div>Подписок пока нет</div>
        )}
      </>
    )
  }

