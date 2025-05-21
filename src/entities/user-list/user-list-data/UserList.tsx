'use client';

import type { Sort} from '@vibe-samurai/visual-ui-kit';

import {Pagination, TableHeader, Table, Loader} from '@vibe-samurai/visual-ui-kit'
import { useState} from "react";

import {useAppDispatch, useAppSelector} from "@/app/store/store";
import {selectOnRowsPerPage} from "@/entities/payments-table/model/selectors/selectOnRowsPerPage";
import {selectSortBy} from "@/entities/payments-table/model/selectors/selectSortBy";
import {selectSortDirection} from "@/entities/payments-table/model/selectors/selectSortDicrection";
import {useGetUsersQuery} from "@/entities/user-list/api/UserListData.generated";
import {setOnRowsPerPageChange} from "@/entities/user-list/model/slices/userSlices";
import {selectSearchValue} from "@/features/search-input/model/selectors/selectSearch";
import { SearchInput } from '@/features/search-input/SearchInput'
import {formatDate} from "@/shared/lib/formatDate";
import {DropdownMenu} from "@/shared/ui/DropdownMenu/DropdownMenu";
import Select from "@/shared/ui/Select/Select";

import styles from './UserList.module.scss';

const columns = [
    {key: "userId", title: "'User ID"},
    {key: "UserName",  sortable: true, title: "Username"},
    {key: "ProfileLink", title: "Profile link"},
    {key: "DateAdded",  sortable: true, dateFilter: true, title: "Date added"},
    {key: 'actions', title: ''},
];

const defaultValue = "All";
const optionsValues = ["Blocked", "Not Blocked"];

export default function UsersList() {

    const [sort, setSort] = useState<Sort>(null)
    const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1)

    const ROWS_PER_PAGE = [8, 25, 100]

    const dispatch = useAppDispatch()
    const onRowsPerPage = useAppSelector(selectOnRowsPerPage)
    const sortBy = useAppSelector(selectSortBy)
    const sortDirection = useAppSelector(selectSortDirection)

    const searchValue = useAppSelector(selectSearchValue)

    const { data, loading } =  useGetUsersQuery({
        variables: {
            pageSize: onRowsPerPage,
            pageNumber: currentPage,
            sortDirection,
            sortBy,
            searchTerm: searchValue,
        },
    })

    const totalPages = data ? Math.ceil(data.getUsers.pagination.totalCount / onRowsPerPage) : 1

    const handleMoreClick = (id: string) => {
        setOpenMenuFor(prev => (prev === id ? null : id));
    }

    const getValueByPath = (obj: any, path: string) =>
        path.split('.').reduce((acc, part) => acc?.[part], obj);

    const sortedData = data?.getUsers?.users.slice().sort((a, b) => {
        if (!sort) return 0;

        const aValue = getValueByPath(a, sort.key);
        const bValue = getValueByPath(b, sort.key);

        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;

        return 0;
    }).map( user => ({
        ...user,
        action: 'more'
    }));

    if (loading) return <Loader />

    return (
        <>
            <div className={styles.container}>
                <div className={styles.searchrSelect}>
                    <SearchInput />
                    <Select defaultValue={defaultValue} optionsValues={optionsValues}/>
                </div>
                <Table.Root>
                    <TableHeader columns={columns} onSort={setSort} sort={sort} />
                    <Table.Body>
                        {sortedData.map(item => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.userName}</Table.Cell>
                                <Table.Cell>{item.email}</Table.Cell>
                                <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                                <Table.Cell
                                    withMoreIcon={item.action === 'more'}
                                    onClickMore={() => handleMoreClick(item.id)}
                                    rowId={item.id}
                                >
                                    {openMenuFor === item.id && (
                                        <DropdownMenu
                                            userId={item.id}
                                            onClose={() => setOpenMenuFor(null)}
                                        />
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    totalPages={totalPages}
                    rowsPerPage={onRowsPerPage}
                    rowsPerPageOptions={ROWS_PER_PAGE}
                    onRowsPerPageChange={newRows => {
                        dispatch(setOnRowsPerPageChange(newRows))
                        setCurrentPage(1)
                    }}
                />
            </div>
        </>
    )
}
