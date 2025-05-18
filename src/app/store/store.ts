import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'

import { paymentPaginationSlice } from '@/entities/PaymentsTable/model/slices/paymentsPaginationSlice'
import { authSlice } from '@/features/auth/model/slices/authSlice'

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [paymentPaginationSlice.reducerPath]: paymentPaginationSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

setupListeners(store.dispatch)
