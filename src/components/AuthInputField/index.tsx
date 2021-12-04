import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { HiOutlineExclamation } from "react-icons/hi";
import { InputLabel, InputAdornment, OutlinedInput } from "@mui/material";
import styles from "./index.module.scss";
import { IAuthTitle } from "../../interfaces/auth";

interface authInputProps {
    titles: IAuthTitle[];
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: { [p: string]: string };
    values: { [p: string]: string | boolean };
}

const AuthInputField: React.FC<authInputProps> = ({
    titles,
    change,
    errors,
    values,
}) => {
    const [visible, setVisible] = useState(false);

    const handleVisability = () => {
        setVisible(!visible);
    };
    return (
        <IconContext.Provider value={{ color: "B5B5B5", size: "20px" }}>
            {titles.map((title) => (
                <div className={styles.formItems} key={title.id}>
                    <InputLabel
                        htmlFor={title.title}
                        className={styles.inputLabel}
                    >
                        {title.label}
                    </InputLabel>
                    {!title.password ? (
                        <OutlinedInput
                            id={title.title}
                            className={styles.inputField}
                            name={title.title}
                            type={title.type}
                            size="small"
                            value={values[title.title]}
                            onChange={change}
                            startAdornment={
                                <InputAdornment position="start">
                                    {title.icon}
                                </InputAdornment>
                            }
                        />
                    ) : (
                        <OutlinedInput
                            id={title.title}
                            className={styles.inputField}
                            name={title.title}
                            type={visible ? "text" : title.type}
                            value={values[title.title]}
                            onChange={change}
                            size="small"
                            startAdornment={
                                <InputAdornment position="start">
                                    {title.icon}
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <button
                                        type="button"
                                        className={styles.iconEye}
                                        aria-label="password visibility"
                                        onClick={handleVisability}
                                    >
                                        {visible ? <FiEye /> : <FiEyeOff />}
                                    </button>
                                </InputAdornment>
                            }
                        />
                    )}
                    <div id="helpInfo" className={styles.helpField}>
                        {errors[title.title] && (
                            <div className={styles.errorInfo}>
                                <div className={styles.errorIcon}>
                                    <HiOutlineExclamation
                                        color="$authErrorColor"
                                        size="16px"
                                    />
                                </div>
                                <div className={styles.errorMessage}>
                                    {errors[title.title]}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </IconContext.Provider>
    );
};

export default AuthInputField;
