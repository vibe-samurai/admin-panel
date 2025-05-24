import { createSlice } from '@reduxjs/toolkit'

import type { SortBy } from '@/entities/payments-table/model/types/types'
import type { SortDirection } from '@/shared/api/types'

type InitialState = {
  onRowsPerPage: 8 | 25 | 100
  sortBy: SortBy | undefined
  sortDirection: SortDirection | undefined
}
const initialState: InitialState = {
  onRowsPerPage: 8,
  sortBy: undefined,
  sortDirection: undefined,
}

const usersSlice = createSlice({
  name: 'userPagination',
  initialState,
  reducers: {
    setOnRowsPerPageChange: (state, action) => {
      state.onRowsPerPage = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload
    },
  },
})

export const { setOnRowsPerPageChange, setSortBy, setSortDirection } = usersSlice.actions
export default usersSlice.reducer
export { usersSlice }
