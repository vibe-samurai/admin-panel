import type { RootState } from "@/app/store/store";

export const selectSortDirection = (state: RootState) => state.paymentPagination.sortDirection