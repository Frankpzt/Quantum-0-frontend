import React, { ReactElement, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
    CircularProgress,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { RootState } from "../../interfaces/redux";
import getVehicleIdByPlate from "../../services/getVehicleIdByPlate";
import {
    handleFormValueChange,
    createNewOrder,
} from "../../models/newOrderSlice";

interface NewOrderCardProps {
    visible: boolean;
    setVisible: () => void;
    setNotVisible: () => void;
}

const NewOrderCard: React.FC<NewOrderCardProps> = ({
    visible,
    setVisible,
    setNotVisible,
}): ReactElement => {
    const [values, setValues] = useState({
        startDate: "",
        endDate: "",
        pickUpLocation: "",
        dropOffLocation: "",
        rentalCost: 0,
        status: "",
        rentPerDay: 0,
        isNewOrderUploaded: "initial",
    });
    const [vehicleId, setVehicleId] = useState("");
    const [plate, setPlate] = useState("");
    const isNewOrderUploaded = useSelector(
        (state: RootState) => state.newOrder.isNewOrderUploaded
    );
    const [buttonClicked, setButtonClicked] = useState(false);
    const [validationErr, setValidationErr] = useState("");
    useEffect(
        () => () => {
            setButtonClicked(false);
        },
        []
    );

    useEffect(() => {
        if (isNewOrderUploaded === "fulfilled" && buttonClicked) {
            setTimeout(() => {
                setNotVisible();
            }, 1200);
        }
        if (isNewOrderUploaded === "rejected") {
            setValidationErr("");
            setVisible();
        }
    }, [buttonClicked, isNewOrderUploaded, setNotVisible, setVisible]);

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const { startDate, endDate, pickUpLocation, dropOffLocation, status } =
            values;
        if (startDate === "") {
            setValidationErr("You must specify a start date.");
            return;
        }
        if (endDate === "") {
            setValidationErr("When will the order end? Specify it.");
            return;
        }
        if (pickUpLocation === "") {
            setValidationErr("You must specify a Pick-up location.");
            return;
        }
        if (dropOffLocation === "") {
            setValidationErr("You must specify a Drop-off location.");
            return;
        }
        if (status === "") {
            setValidationErr("What's the current status of this order?");
            return;
        }
        if (vehicleId === "") {
            setValidationErr(
                "It seems that you have not registered this vehicle yet"
            );
            return;
        }
        const valuesToBeSent = { ...values, vehicleId };
        dispatch(handleFormValueChange(valuesToBeSent));
        dispatch(createNewOrder(valuesToBeSent));
        setButtonClicked(true);
    };

    const handlePlateNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (e.target.value.length > 7 || e.target.value.length === 0) {
            setValidationErr(
                "Plate number must be less than 7 characters, and can not be none!"
            );
            setPlate("");
            return;
        }
        setPlate(e.target.value);
        getVehicleIdByPlate(e.target.value).then((response) => {
            setVehicleId(response.data);
            console.log(response.data);
        });
    };

    const handleValueChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        let valueToBeSet = e.target.value;
        if (
            (e.target.name === "rentPerDay" ||
                e.target.name === "rentalCost") &&
            e.target.value.startsWith("0") &&
            e.target.value.length > 0
        ) {
            valueToBeSet = e.target.value.substr(1);
        } else if (
            (e.target.name === "rentPerDay" ||
                e.target.name === "rentalCost") &&
            e.target.value === ""
        ) {
            valueToBeSet = "0";
        }
        setValues({ ...values, [e.target.name]: valueToBeSet });
    };

    const handleStatusChange = (e: SelectChangeEvent) => {
        setValues({ ...values, status: e.target.value });
    };

    return (
        <div className={styles.container}>
            <IconButton className={styles.closeButton} onClick={setNotVisible}>
                <CloseIcon />
            </IconButton>

            <div className={styles.content}>
                {isNewOrderUploaded === "rejected" && (
                    <h3 className={styles.errorMsg}>
                        Error! Please check your connection...
                    </h3>
                )}
                {validationErr !== "" && (
                    <h3 className={styles.errorMsg}>{validationErr}</h3>
                )}
                <h2>New Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.firstRow}>
                        <div>
                            <div>
                                <label htmlFor="plate">
                                    Vehicle Plate Number
                                    <input
                                        id="plate"
                                        type="string"
                                        name="plate"
                                        value={plate}
                                        onChange={handlePlateNumberChange}
                                    />
                                </label>
                            </div>
                            <label htmlFor="startDate">
                                Start Date
                                <input
                                    id="startDate"
                                    type="date"
                                    name="startDate"
                                    value={values.startDate}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="endDate">
                                End Date
                                <input
                                    id="endDate"
                                    type="date"
                                    name="endDate"
                                    value={values.endDate}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="pickUpLocation">
                                Pick Up Location
                                <input
                                    id="pickUpLocation"
                                    type="string"
                                    name="pickUpLocation"
                                    value={values.pickUpLocation}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="dropOffLocation">
                                Drop Off Location
                                <input
                                    id="dropOffLocation"
                                    type="string"
                                    name="dropOffLocation"
                                    value={values.dropOffLocation}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="rentalCost">
                                Daily Cost
                                <input
                                    id="rentalCost"
                                    type="number"
                                    name="rentalCost"
                                    value={values.rentalCost}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="rentPerDay">
                                Rent per day
                                <input
                                    id="rentPerDay"
                                    type="number"
                                    name="rentPerDay"
                                    value={values.rentPerDay}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <FormControl>
                            <InputLabel id="Status-label">Status</InputLabel>

                            <Select
                                labelId="Status-label"
                                id="demo-simple-select"
                                value={values.status}
                                label="Status"
                                onChange={handleStatusChange}
                                className={styles.selectInput}
                            >
                                <MenuItem value="pending">
                                    <svg
                                        width="9"
                                        height="10"
                                        viewBox="0 0 9 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="4.5"
                                            cy="5"
                                            r="4.5"
                                            fill="#FF0707"
                                        />
                                    </svg>

                                    <span>&nbsp;pending</span>
                                </MenuItem>

                                <MenuItem value="completed">
                                    <svg
                                        width="9"
                                        height="10"
                                        viewBox="0 0 9 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="4.5"
                                            cy="5"
                                            r="4.5"
                                            fill="#65a2ff"
                                        />
                                    </svg>

                                    <span>&nbsp;completed</span>
                                </MenuItem>

                                <Divider />

                                <MenuItem value="cancelled">
                                    <svg
                                        width="9"
                                        height="10"
                                        viewBox="0 0 9 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="4.5"
                                            cy="5"
                                            r="4.5"
                                            fill="#00b893"
                                        />
                                    </svg>

                                    <span>&nbsp;cancelled</span>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button
                        variant="contained"
                        className={styles.button}
                        type="submit"
                        disabled={buttonClicked}
                        onClick={handleSubmit}
                    >
                        {!buttonClicked ? (
                            <div className={styles.button_text}>Create</div>
                        ) : (
                            <CircularProgress
                                color="inherit"
                                className={styles.circularProgress}
                            />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewOrderCard;
