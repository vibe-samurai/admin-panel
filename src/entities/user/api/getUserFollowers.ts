import { gql } from '@apollo/client'

export const GET_FOLLOWERS = gql`
  query GetFollowers(
    $userId: Int!
    $pageNumber: Int = 1
    $pageSize: Int = 100
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getFollowers(
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
