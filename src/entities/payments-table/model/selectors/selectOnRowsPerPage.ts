import type { RootState } from "@/app/store/store";

export const selectOnRowsPerPage = (state: RootState) => state.paymentPagination.onRowsPerPage