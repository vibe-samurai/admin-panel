import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onRowsPerPageChange: 8
}

const paymentPaginationSlice = createSlice({
    name: 'paymentPagination',
    initialState,
    reducers: {
        setOnRowsPerPageChange: (state, action) => {
            state.onRowsPerPageChange = action.payload
        }
    }
})

export const { setOnRowsPerPageChange } = paymentPaginationSlice.actions
export default paymentPaginationSlice.reducer
export {paymentPaginationSlice }