'use client'

import { useGetPaymentsByUserQuery } from '@/entities/user/api/getUserPayments.generated'

type Props = {
  userId: string
}

const formatDate = (dateStr: string | null | undefined) =>
  dateStr ? new Date(dateStr).toLocaleDateString('ru-RU') : '—'

const formatSubscriptionType = (type: string | null | undefined) => {
  switch (type) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 day'
    case 'MONTHLY':
      return '30 day'
    default:
      return '—'
  }
}

export default function UserPayments({ userId }: Props) {
  const { data, loading, error } = useGetPaymentsByUserQuery({
    variables: {
      userId: Number(userId),
      pageNumber: 1,
      pageSize: 10,
    },
  })

  if (loading) return <p>Loading payments...</p>
  if (error) return <p>Error: {error.message}</p>

  const payments = data?.getPaymentsByUser.items || []

  return (
    <div>
      <table>
        <thead style={{ background: '#1e1e1e' }}>
          <tr>
            <th style={{ padding: '12px' }}>Date of Payment</th>
            <th style={{ padding: '12px' }}>End date of subscription</th>
            <th style={{ padding: '12px' }}>Amount, $</th>
            <th style={{ padding: '12px' }}>Subscription Type</th>
            <th style={{ padding: '12px' }}>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td style={{ padding: '12px' }}>{formatDate(payment.dateOfPayment)}</td>
              <td style={{ padding: '12px' }}>{formatDate(payment.endDate)}</td>
              <td style={{ padding: '12px' }}>${payment.price}</td>
              <td style={{ padding: '12px' }}>{formatSubscriptionType(payment.type)}</td>
              <td style={{ padding: '12px' }}>{payment.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
