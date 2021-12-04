import React from "react";
import { FiPlus } from "react-icons/fi";
import styles from "./AddButton.module.scss";

interface AddButtonProps {
    value: string;
    onClick?: () => void;
}
const AddButton: React.FC<AddButtonProps> = ({ value, onClick }) => (
    <div className={styles.addButton}>
        <button type="button" onClick={onClick}>
            <FiPlus />
            <span>{value}</span>
        </button>
    </div>
);

AddButton.defaultProps = {
    onClick: () => {},
};

export default AddButton;
