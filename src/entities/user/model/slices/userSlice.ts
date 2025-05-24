import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  userId: number | null
}

const initialState: UserState = {
  userId: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload
    },
  },
  selectors: {
    selectUserId: state => state.userId,
  },
})

export const { setUserId } = userSlice.actions
export const { selectUserId } = userSlice.selectors
export default userSlice.reducer
