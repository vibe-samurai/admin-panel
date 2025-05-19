import type { RootState } from "@/app/store/store";

export const selectOnRowsPerChange = (state: RootState) => state.paymentPagination.onRowsPerPageChange