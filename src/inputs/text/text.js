import React, {useState} from "react";
import styles from "./text.module.css";

export default function Text({ value, onChange, className, style, disabled, placeholder }) {
    const [focused, setFocused] = useState(false);

    return (
        <div className={className} style={style}>
            <div className={styles.container}>
                <div
                    style={{
                        color: !focused && !value ? '#999' : '#000',
                    }}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onInput={(e) => {
                        if(onChange) onChange(e.currentTarget.textContent);
                    }}
                    className={styles.input}
                >
                    {!focused && !value && placeholder}
                </div>
            </div>
        </div>
    )
}