import { gql } from '@apollo/client'

export const GET_FOLLOWING = gql`
  query GetFollowing(
    $userId: Int!
    $pageNumber: Int = 1
    $pageSize: Int = 100
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getFollowing(
      userId: $userId
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        userName
        createdAt
      }
      page
      pageSize
      pagesCount
      totalCount
    }
  }
`
