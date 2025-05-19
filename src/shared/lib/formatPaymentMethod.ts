export const formatPaymentMethod = (method: string) => {
  switch (method) {
    case 'STRIPE':
      return 'Stripe'
    case 'PAYPAL':
      return 'PayPal'
    default:
      break
  }
}
