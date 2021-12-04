import React, { useState } from "react";
import Backdrop from "../DeleteAccidentModal/Backdrop";
import DeleteAccidentModal from "../DeleteAccidentModal";
import DeleteBtnStyle from "./DeleteAccidentRecord.module.scss";

const DeleteAccidentRecord = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const deleteHandler = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div>
            <div>
                <button
                    type="button"
                    className={DeleteBtnStyle.deleteBtn}
                    onClick={deleteHandler}
                >
                    Delete
                </button>
            </div>
            {modalIsOpen && (
                <DeleteAccidentModal
                    onCancel={closeModal}
                    onConfirm={closeModal}
                />
            )}
            {modalIsOpen && <Backdrop onCancel={closeModal} />}
        </div>
    );
};

export default DeleteAccidentRecord;
