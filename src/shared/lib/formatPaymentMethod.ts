export const formatPaymentMethod = (method: string | null | undefined): string => {
  switch (method) {
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'PAYPAL':
      return 'PayPal'
    case 'STRIPE':
      return 'Stripe'
    default:
      return '—'
  }
}
