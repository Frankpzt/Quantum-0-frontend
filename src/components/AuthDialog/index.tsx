import React from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import styles from "./index.module.scss";

interface AuthDialogProps {
    buttonContent: string;
    titles: string;
    content: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
    buttonContent,
    titles,
    content,
}) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className={styles.dialogButton}
                onClick={handleClickOpen}
            >
                {buttonContent}
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div id="alert-dialog-title" className={styles.dialogTitle}>
                    {titles}
                </div>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                        <DialogActions>
                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </DialogActions>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthDialog;
