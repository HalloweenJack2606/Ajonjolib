import React, {useEffect, useRef, useState} from "react";
import styles from './searchbox.module.css';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SearchBox({value, onChange, onInput, className, style, disabled}) {
    const [searchTerm, setSearchTerm] = useState(value);
    const contentEditableRef = useRef(null);

    useEffect(() => {
        if (onChange) onChange(searchTerm);
    }, [searchTerm])

    const search = () => {
        if(onInput) onInput(searchTerm);
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            search();
        }
    };

    return (
        <div className={className} style={style}>
            <div className={styles.container}>
                <div
                    contentEditable={true}
                    ref={contentEditableRef}
                    onKeyDown={handleEnterKey}
                    onInput={(e) => {setSearchTerm(e.currentTarget.textContent);}}
                    className={styles.input}
                />

                <div className={styles.searchIcon} onClick={() => search()}>
                    <FontAwesomeIcon icon={faSearch} color={'#CCC'} />
                </div>
            </div>
        </div>
    );
}