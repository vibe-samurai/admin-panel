import { useAppSelector } from '@/app/store/store';
import { selectSortBy } from '@/entities/payments-table/model/selectors/selectSortBy';
import { selectSortDirection } from '@/entities/payments-table/model/selectors/selectSortDicrection';
import type { SortBy } from '@/entities/payments-table/model/types/types';

import s from './SortButton.module.scss'
type Props = {
    field: SortBy
    onClick: ()=>void
}

export const SortButton = ({ field, onClick }: Props) => {
  const sortDirection = useAppSelector(selectSortDirection)
  const sortBy = useAppSelector(selectSortBy)

  const isActive = sortBy === field;

    const renderIcon = () => {
      if (!isActive || sortDirection === undefined) {
      return (
        <svg width={"8"} height={"12"} viewBox={"0 0 8 12"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
          <path d={"M4 0L7.4641 4.5H0.535898L4 0Z"} fill={"#4C4C4C"} />
          <path d={"M4 12L0.535898 7.5H7.4641L4 12Z"} fill={"#4C4C4C"} />
        </svg>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <svg width={"8"} height={"5"} viewBox={"0 0 8 5"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
          <path d={"M4 0L7.4641 4.5H0.535898L4 0Z"} fill={"#4C4C4C"} />
        </svg>
      );
    }

    return (
      <svg width={"8"} height={"5"} viewBox={"0 0 8 5"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
        <path d={"M4 5L0.535898 0.5H7.4641L4 5Z"} fill={"#4C4C4C"} />
      </svg>
    );
    };
  
    return <button onClick={onClick} className={ s.button} type={"button"}>{renderIcon()}</button>;
  };