import * as Types from '../../../shared/api/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUsersQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPaginationModel', users: Array<{ __typename?: 'User', id: number, userName: string, email: string, createdAt: string, profile: { __typename?: 'Profile', id: number, userName?: string | null, firstName?: string | null, lastName?: string | null, city?: string | null, country?: string | null, region?: string | null, dateOfBirth?: string | null, aboutMe?: string | null, createdAt: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: string } | null }>, pagination: { __typename?: 'PaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number } } };


export const GetUsersDocument = gql`
    query GetUsers($pageSize: Int = 10, $pageNumber: Int = 1, $sortDirection: SortDirection = desc, $sortBy: String = "createdAt", $searchTerm: String) {
  getUsers(
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortDirection: $sortDirection
    sortBy: $sortBy
    searchTerm: $searchTerm
  ) {
    users {
      id
      userName
      email
      createdAt
      profile {
        id
        userName
        firstName
        lastName
        city
        country
        region
        dateOfBirth
        aboutMe
        createdAt
        avatars {
          url
          width
          height
          fileSize
        }
      }
      userBan {
        reason
        createdAt
      }
    }
    pagination {
      pagesCount
      page
      pageSize
      totalCount
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortDirection: // value for 'sortDirection'
 *      sortBy: // value for 'sortBy'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;