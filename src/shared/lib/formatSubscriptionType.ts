export const formatSubscriptionType = (type: string) => {
  switch (type) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 days'
    case 'MONTHLY':
      return '30 days'
    default:
      break
  }
}
