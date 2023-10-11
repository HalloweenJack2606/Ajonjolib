import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from './select.module.css';

export default function Select({ searchable, options, value, onChange, placeholder, className, style, disabled, multi, showQuantity }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const [selectedOptionValues, setSelectedOptionValues] = useState([]);
    const [selectedOptionNames, setSelectedOptionNames] = useState([]);
    const selectedTextRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            if(selectedTextRef.current) {
                selectedTextRef.current.blur();
            }
            setIsOpen(false);
        }
    };

    const toggleOption = (optionValue, optionName) => {
        setSearchTerm('');
        setSelectedText();
        if (multi) {
            // If multi-select is enabled, toggle the selected option
            const index = selectedOptionValues.indexOf(optionValue);
            if (index === -1) {
                const newValues = [...selectedOptionValues, optionValue]
                setSelectedOptionValues(newValues);
                setSelectedOptionNames([...selectedOptionNames, optionName]);
                if(onChange) onChange(newValues);
            } else {
                const newValues = selectedOptionValues.filter((obtainedValue) => obtainedValue !== optionValue);
                setSelectedOptionValues(newValues);
                setSelectedOptionNames(selectedOptionNames.filter((name) => name !== optionName));
                if(onChange) onChange(newValues);
            }
        } else {
            // If multi-select is not enabled, select the clicked option
            setSelectedOptionValues([optionValue]);
            setSelectedOptionNames([optionName]);
            setIsOpen(false);
            if(onChange) onChange([optionValue]);
        }
    };

    useEffect(() => {
        if (disabled === true) {
            setIsOpen(false);
        }
    }, [disabled]);

    useEffect(() => {
        if (!multi && value !== undefined) {
            // If multi-select is not enabled and a value is provided, update the selected options
            const selectedOption = options.find((option) => option.value === value);
            if (selectedOption) {
                setSelectedOptionValues([selectedOption.value]);
                setSelectedOptionNames([selectedOption.name]);
            }
        } else {
            // If multi-select is enabled and a value is provided, update the selected options
            const selectedOptions = options.filter((option) => value.includes(option.value));
            if (selectedOptions.length > 0) {
                setSelectedOptionValues(selectedOptions.map((option) => option.value));
                setSelectedOptionNames(selectedOptions.map((option) => option.name));
            }
        }
    }, [value, multi, options]);

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const setSelectedText = (text) => {
        if (selectedTextRef.current) {
            selectedTextRef.current.innerHTML = text
        }
    };

    useEffect(() => {
        if(selectedOptionNames.length === 0) setSelectedText('Search...');
        else setSelectedText('');
    }, [selectedOptionNames]);

    return (
        <div className={`${styles.container} ${className}`} ref={dropdownRef} style={style}>
            {/* Dropdown button */}
            <div
                className={styles.dropdownButton}
                onClick={() => setIsOpen((prev) => (!disabled ? !prev : false))}
            >
                <div style={{ display: 'flex', width: '100%' }}>
                    <div>
                        {showQuantity ? (placeholder + " (" + selectedOptionNames.length.toString() + ")") : selectedOptionNames.join(', ') || placeholder || (!searchable && 'Select an option')}
                    </div>
                    {/* Search input (as a div capturing keys) */}
                    {searchable && (
                        <div ref={selectedTextRef}
                             contentEditable={true}
                             suppressContentEditableWarning={true}
                             onClick={() => {setSelectedText(''); setSearchTerm(''); setIsOpen(true);}}
                             onInput={(e) => {setSearchTerm(e.currentTarget.textContent); setIsOpen(true);}}
                             className={styles.searchInput}
                        />
                    )}
                </div>
                <div style={{ borderLeft: '1px solid #ccc', paddingLeft: '0.5rem' }}>
                    {isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                </div>
            </div>

            {/* Options */}
            <div className={`${styles.dropdownOptions} ${isOpen ? styles.show : ''}`}>
                {filteredOptions.map((option, index) => (
                    <div
                        key={index}
                        className={`${styles.option} ${
                            !multi && selectedOptionValues.includes(option.value) ? styles.selected : ''
                        }`}
                        onClick={() => toggleOption(option.value, option.name)}
                    >
                        {multi && (
                            <div className={styles.checkbox}>
                                {selectedOptionValues.includes(option.value) && (
                                    <FontAwesomeIcon icon={faCheck} color={'#000'} />
                                )}
                            </div>
                        )}
                        {option.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
