import { gql } from '@apollo/client'

export const GET_PAYMENTS_WITH_USERS = gql`
  query GetPayments(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $searchTerm: String
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userName
        paymentMethod
        amount
        currency
        createdAt
        type
        avatars {
          url
        }
      }
    }
  }
`
