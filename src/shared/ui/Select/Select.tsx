import { useState } from "react";

import styles from "./Select.module.scss";

export default function Select({defaultValue, optionsValues}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const options = optionsValues;

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    return (
        <div className={styles.selectWrapper}>
            <div className={styles.select} onClick={toggleDropdown}>
                {selectedValue}
            </div>
            {isOpen && (
                <ul className={styles.dropdown}>
                    {options.map((option) => (
                        <li
                            key={option}
                            className={styles.option}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}