import React from "react";
import { MdWarning } from "react-icons/md";
import styles from "./DeleteAccidentModal.module.scss";

interface DeleteProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteAccidentModal: React.FC<DeleteProps> = ({
    onCancel,
    onConfirm,
}) => (
    <div className={styles.container}>
        <div className={styles.icon}>
            <MdWarning />
        </div>
        <div className={styles.message}>
            The accident record of this vehicle will be permanently deleted.
        </div>
        <div className={styles.buttons}>
            <button
                type="button"
                className={styles.deleteBtn}
                onClick={onCancel}
            >
                Delete
            </button>
            <button
                type="button"
                className={styles.cancelBtn}
                onClick={onConfirm}
            >
                Cancel
            </button>
        </div>
    </div>
);
export default DeleteAccidentModal;
