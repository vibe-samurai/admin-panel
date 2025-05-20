import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector } from 'react-redux'

import { paymentSlice } from '@/entities/payments-table/model/slices/paymentsSlice'
import { authSlice } from '@/features/auth/model/slices/authSlice'
import { searchSlice } from '@/features/search-input/model/slices/searchSlice'

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [paymentSlice.reducerPath]: paymentSlice.reducer,
    [searchSlice.reducerPath]: searchSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

setupListeners(store.dispatch)
