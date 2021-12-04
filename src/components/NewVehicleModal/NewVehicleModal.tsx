import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./NewVehicleModal.module.scss";
import TextField from "../TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createVehicle, resetRequest } from "../../models/newVehicleSlice";

interface NewVehicleModalProps {
    open: boolean;
    handleClose: () => void;
}

const NewVehicleModal: React.FC<NewVehicleModalProps> = ({
    open,
    handleClose,
}) => {
    const [vehicleDetails, setVehicleDetails] = useState({
        make: "",
        registerNumber: "",
        plate: "",
        year: "",
        miles: "",
        body: "",
        color: "",
        seats: "",
        transmission: "",
        totalRentDay: "",
        dailyRent: "",
    });
    const [clicked, setClicked] = useState(false);
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleDetails({
            ...vehicleDetails,
            [e.target.name]: e.target.value,
        });
    };

    const dispatch = useAppDispatch();
    const isVehicleUploaded = useAppSelector(
        (state) => state.newVehicle.isNewVehicleUploaded
    );

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const newVehiclePayload = {
            ...vehicleDetails,
            year: parseInt(vehicleDetails.year, 10) || 0,
            miles: parseFloat(vehicleDetails.miles) || 0,
            seats: parseInt(vehicleDetails.seats, 10) || 0,
            totalRentDay: parseFloat(vehicleDetails.totalRentDay) || 0,
            dailyRent: parseFloat(vehicleDetails.dailyRent) || 0,
        };
        setClicked(true);
        dispatch(createVehicle(newVehiclePayload));
    };

    useEffect(() => {
        if (isVehicleUploaded === "fulfilled") {
            setTimeout(() => {
                handleClose();
                // reset button
                setClicked(false);
                // reset form fields
                setVehicleDetails({
                    make: "",
                    registerNumber: "",
                    plate: "",
                    year: "",
                    miles: "",
                    body: "",
                    color: "",
                    seats: "",
                    transmission: "",
                    totalRentDay: "",
                    dailyRent: "",
                });
            }, 1000);
            // reset request
            dispatch(resetRequest("initial"));
        } else if (isVehicleUploaded === "rejected") {
            setClicked(false);
        }
    }, [isVehicleUploaded, clicked, handleClose, dispatch]);
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.modalContainer}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Add New Car Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.form}>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="make"
                                        name="make"
                                        label="Make"
                                        placeholder="Make"
                                        value={vehicleDetails.make}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="registerNumber"
                                        name="registerNumber"
                                        label="Register Number"
                                        placeholder="Register Number"
                                        value={vehicleDetails.registerNumber}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="plate"
                                        name="plate"
                                        label="Plate"
                                        placeholder="Plate"
                                        value={vehicleDetails.plate}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="year"
                                        name="year"
                                        label="Year"
                                        placeholder="Year"
                                        value={vehicleDetails.year}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="miles"
                                        name="miles"
                                        label="Miles"
                                        placeholder="Miles"
                                        value={vehicleDetails.miles}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="body"
                                        name="body"
                                        label="Body"
                                        placeholder="Body"
                                        value={vehicleDetails.body}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="color"
                                        name="color"
                                        label="Color"
                                        placeholder="Color"
                                        value={vehicleDetails.color}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="seats"
                                        name="seats"
                                        label="Seats"
                                        placeholder="Seats"
                                        value={vehicleDetails.seats}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="transmission"
                                        name="transmission"
                                        label="Transmission"
                                        placeholder="Transmission"
                                        value={vehicleDetails.transmission}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="totalRentDay"
                                        name="totalRentDay"
                                        label="Total Rent Day"
                                        placeholder="Total Rent Day"
                                        value={vehicleDetails.totalRentDay}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className={styles.formControl}>
                                    <TextField
                                        id="dailyRent"
                                        name="dailyRent"
                                        label="Daily Rent"
                                        placeholder="Daily Rent"
                                        value={vehicleDetails.dailyRent}
                                        onChange={handleValueChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.box}>
                                <Button
                                    className={styles.button}
                                    variant="contained"
                                    type="submit"
                                >
                                    {!clicked ? (
                                        <div>Create</div>
                                    ) : (
                                        <CircularProgress color="inherit" />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Typography>
                </div>
            </Modal>
        </div>
    );
};

export default NewVehicleModal;
