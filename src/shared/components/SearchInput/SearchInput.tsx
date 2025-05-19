import { Input, SearchIcon } from '@vibe-samurai/visual-ui-kit';

import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { selectSearchValue } from '@/features/search-input/model/selectors/selectSearch';
import { setSearchValue } from '@/features/search-input/model/slices/searchSlice';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';

import s from './SearchInput.module.scss'


export const SearchInput = () => {
    const dispatch = useAppDispatch()
    const searchValue = useAppSelector(selectSearchValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(e.target.value));
      };

    return (
        <div className={s.wrapper}>
            <SearchIcon className={ s.icon} />
        <Input type={"text"} placeholder={"Search"} className={s.input} value={searchValue} onChange={onChange} />
       </div>
    );
};

