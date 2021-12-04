import React from "react";
import styles from "./DisplayField.module.scss";

interface FieldProps {
    value: string | number;
}

const DisplayField: React.FC<FieldProps> = ({ value }) => (
    <div className={styles.displayField}>{value || "Data missing"}</div>
);

export default DisplayField;
