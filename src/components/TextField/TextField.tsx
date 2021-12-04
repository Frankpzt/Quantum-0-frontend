import React from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps {
    id: string;
    label: string;
    value?: string | number;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({
    id,
    label,
    value,
    disabled,
    placeholder,
    name,
    onChange,
}) => (
    <div className={styles.formControl}>
        <label htmlFor={id}> {label} </label>
        <input
            disabled={disabled}
            id={id}
            name={name}
            value={value}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
);

TextField.defaultProps = {
    disabled: false,
    placeholder: "",
    value: "",
    name: "",
    onChange: () => {},
};

export default TextField;
