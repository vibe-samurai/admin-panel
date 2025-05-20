import { Input, SearchIcon } from '@vibe-samurai/visual-ui-kit'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { selectSearchValue } from '@/features/search-input/model/selectors/selectSearch'
import { setSearchValue } from '@/features/search-input/model/slices/searchSlice'
import { useDebouncedEffect } from '@/shared/hooks/useDebouncedValue'

import s from './SearchInput.module.scss'

export const SearchInput = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(selectSearchValue)
  const [input, setInput] = useState(searchValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  useDebouncedEffect(
    () => {
      dispatch(setSearchValue(input))
    },
    [input],
    500
  )

  return (
    <div className={s.wrapper}>
      <SearchIcon className={s.icon} />
      <Input
        type={'text'}
        placeholder={'Search'}
        className={s.input}
        value={input}
        onChange={onChange}
      />
    </div>
  )
}
