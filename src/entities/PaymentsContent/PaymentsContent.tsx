'use client'

import { Input } from '@vibe-samurai/visual-ui-kit';

import { PaymentsTable } from '../PaymentsTable';
import s from './PaymentsContent.module.scss'
export const PaymentsContent = () => {
    return (
        <div className={s.payments}>
            <Input placeholder={"Search"} />
            <PaymentsTable/>
          </div>
    );
};

