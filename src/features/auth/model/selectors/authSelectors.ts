import type { RootState } from '@/app/store/store'

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectIsLoading = (state: RootState) => state.auth.isLoading
