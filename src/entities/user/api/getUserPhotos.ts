import { gql } from '@apollo/client'

export const GET_PHOTOS = gql`
  query GetUserPhotos($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      items {
        id
        url
        createdAt
        width
        height
        fileSize
      }
      pageSize
      pagesCount
      totalCount
    }
  }
`
