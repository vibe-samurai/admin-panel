import {gql} from "@apollo/client";

export const GET_USERS_LIST_DATA = gql`
    query GetUsers (
        $pageSize: Int = 10
        $pageNumber: Int = 1
        $sortDirection: SortDirection = desc
        $sortBy: String = "createdAt"
        $searchTerm: String
    ){
        getUsers(
            pageSize: $pageSize
            pageNumber: $pageNumber
            sortDirection: $sortDirection
            sortBy:  $sortBy
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
    }`