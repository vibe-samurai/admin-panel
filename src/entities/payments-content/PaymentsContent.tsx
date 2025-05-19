'use client'

import { SearchInput } from '@/features/search-input/SearchInput'

import s from './PaymentsContent.module.scss'
import { PaymentsTable } from '../payments-table/PaymentsTable'
export const PaymentsContent = () => {
  return (
    <div className={s.payments}>
      <SearchInput />
      <PaymentsTable />
    </div>
  )
}
