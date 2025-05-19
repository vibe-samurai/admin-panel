import type { SortBy } from "../types/types";

import { createSlice } from "@reduxjs/toolkit";

import type { SortDirection } from "@/shared/api/types";



type InitialState = {
    onRowsPerPageChange: 8 | 25 | 100
    sortBy: SortBy | undefined
    sortDirection: SortDirection| undefined
}
const initialState:  InitialState = {
    onRowsPerPageChange: 8,
    sortBy: undefined,
    sortDirection: undefined
}

const paymentSlice = createSlice({
    name: 'paymentPagination',
    initialState,
    reducers: {
        setOnRowsPerPageChange: (state, action) => {
            state.onRowsPerPageChange = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setSortDirection: (state, action) => {
            state.sortDirection = action.payload
        },
    }
})

export const { setOnRowsPerPageChange, setSortBy, setSortDirection } = paymentSlice.actions
export default paymentSlice.reducer
export {paymentSlice }