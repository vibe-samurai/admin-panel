import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { selectSortBy } from '@/entities/payments-table/model/selectors/selectSortBy'
import { selectSortDirection } from '@/entities/payments-table/model/selectors/selectSortDicrection'
import { setSortDirection, setSortBy } from '@/entities/payments-table/model/slices/paymentsSlice'
import type { SortBy } from '@/entities/payments-table/model/types/types'

export const useToggleSort = () => {
  const sortBy = useAppSelector(selectSortBy)
  const sortDirection = useAppSelector(selectSortDirection)
  const dispatch = useAppDispatch()

  return (field: SortBy) => {
    if (sortBy === field) {
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'))
    } else {
      dispatch(setSortBy(field))
      dispatch(setSortDirection('asc'))
    }
  }
}
