import React from "react";
import styles from "./Backdrop.module.scss";

interface BackdropProps {
    onCancel: () => void;
}
const Backdrop: React.FC<BackdropProps> = ({ onCancel }) => (
    <div className={styles.backdrop} onClick={onCancel} aria-hidden="true" />
);

export default Backdrop;
