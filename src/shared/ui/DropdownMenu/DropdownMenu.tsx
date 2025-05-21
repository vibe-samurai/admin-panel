import { useRef, useEffect } from 'react';

import BlockIcon from "@/shared/ui/DropdownMenu/icons/BlockIcon";
import {DropdownIcon} from "@/shared/ui/DropdownMenu/icons/DropdownIcon";
import PersonRemoveIcon from "@/shared/ui/DropdownMenu/icons/PersonRemoveIcon";

import styles from './DropdownMenu.module.scss';



interface DropdownMenuProps {
    userId: string;
    onClose: () => void;
}

export const DropdownMenu = ({ userId, onClose }: DropdownMenuProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDelete = () => {
        console.log('Delete user', userId);
        onClose();
    };

    const handleBan = () => {
        console.log('Ban user', userId);
        onClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <div className={styles.dropdownMenu}>
                <button className={styles.menuItem} onClick={handleDelete}>
                    <PersonRemoveIcon/>
                    <div className={styles.text}>Delete User</div>
                </button>
                <button className={styles.menuItem} onClick={handleBan}>
                    <BlockIcon/>
                    <div className={styles.text}>Ban in the system</div>
                </button>
                <button className={styles.menuItem}>
                    <DropdownIcon/>
                    <div className={styles.text}>More Information</div>
                </button>
            </div>
        </div>
    );
};