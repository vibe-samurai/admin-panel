import { Input, SearchIcon } from '@vibe-samurai/visual-ui-kit';
import { useEffect, useState } from 'react';

import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';

import s from './SearchInput.module.scss'

type Props = {
    onDebouncedChange: (value: string)=>void
}

export const SearchInput = ({ onDebouncedChange}: Props) => {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebouncedValue(search, 400)

    return (
        <div className={s.wrapper}>
            <SearchIcon className={ s.icon} />
        <Input type={"text"} placeholder={"Search"} className={s.input} value={search} onChange={(e)=>{setSearch(e.target.value)}} />
       </div>
    );
};

