import type { RootState } from '@/app/store/store'

export const selectSortBy = (state: RootState) => state.paymentPagination.sortBy
