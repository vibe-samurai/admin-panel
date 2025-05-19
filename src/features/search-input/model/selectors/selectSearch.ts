import type { RootState } from '@/app/store/store'

export const selectSearchValue = (state: RootState) => state.searchSlice.searchValue
