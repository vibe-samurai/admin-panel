import { gql } from '@apollo/client'

export const GET_PAYMENTS = gql`
  query GetPaymentsByUser(
    $userId: Int!
    $pageNumber: Int = 1
    $pageSize: Int = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPaymentsByUser(
      userId: $userId
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        id
        dateOfPayment
        endDate
        price
        type
        paymentType
        status
      }
      page
      pageSize
      pagesCount
      totalCount
    }
  }
`
