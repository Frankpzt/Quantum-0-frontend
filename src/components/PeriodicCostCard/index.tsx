import React, { ReactElement, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import {
    createPeriodicRecord,
    handleFormValueChange,
    resetRequest,
} from "../../models/periodicCostSlice";
import { RootState } from "../../interfaces/redux";

interface PeriodicCostProps {
    visible: boolean;
    setVisible: () => void;
    setNotVisible: () => void;
    vehicleId: string;
}

const PeriodicCostCard: React.FC<PeriodicCostProps> = ({
    visible,
    setVisible,
    setNotVisible,
    vehicleId,
}): ReactElement => {
    const [values, setValues] = useState({
        id: vehicleId,
        periodicCost: {
            periodicType: "",
            cost: 0,
            date: "",
            nextPaymentTime: "",
        },
    });
    const isPeriodicCostUploaded = useSelector(
        (state: RootState) => state.periodicCost.isPeriodicCostUploaded
    );
    const [buttonClicked, setButtonClicked] = useState(false);
    const [validationErr, setValidationErr] = useState("");
    useEffect(
        () => () => {
            setButtonClicked(false);
        },
        []
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (isPeriodicCostUploaded === "fulfilled" && buttonClicked) {
            setTimeout(() => {
                setNotVisible();
                dispatch(resetRequest("initial"));
            }, 1000);
        }
        if (isPeriodicCostUploaded === "rejected") {
            setValidationErr("");
            setVisible();
        }
    }, [
        buttonClicked,
        isPeriodicCostUploaded,
        setNotVisible,
        setVisible,
        dispatch,
    ]);

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const { periodicType, date, nextPaymentTime } = values.periodicCost;
        if (date === "") {
            setValidationErr("You must specify a date.");
            return;
        }
        if (nextPaymentTime === "") {
            setValidationErr("When's the next payment time? Specify it.");
            return;
        }
        if (periodicType === "") {
            setValidationErr("You must specify a periodic cost type.");
            return;
        }
        dispatch(handleFormValueChange(values));
        dispatch(createPeriodicRecord(values));
        setButtonClicked(true);
    };

    const handleValueChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        let valueToBeSet = e.target.value;
        if (
            e.target.name === "cost" &&
            e.target.value.startsWith("0") &&
            e.target.value.length > 0
        ) {
            valueToBeSet = e.target.value.substr(1);
        } else if (e.target.name === "cost" && e.target.value === "") {
            valueToBeSet = "0";
        }
        setValues({
            ...values,
            periodicCost: {
                ...values.periodicCost,
                [e.target.name]: valueToBeSet,
            },
        });
    };

    return (
        <div className={styles.container}>
            <IconButton className={styles.closeButton} onClick={setNotVisible}>
                <CloseIcon />
            </IconButton>

            <div className={styles.content}>
                {isPeriodicCostUploaded === "rejected" && (
                    <h3 className={styles.errorMsg}>
                        Error! Please check your connection...
                    </h3>
                )}
                {validationErr !== "" && (
                    <h3 className={styles.errorMsg}>{validationErr}</h3>
                )}
                <h2>New Periodic Cost</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.firstRow}>
                        <div>
                            <label htmlFor="date">
                                Date
                                <input
                                    id="date"
                                    type="datetime-local"
                                    name="date"
                                    value={values.periodicCost.date}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="nextPaymentTime">
                                Next Payment Time
                                <input
                                    id="nextPaymentTime"
                                    type="datetime-local"
                                    name="nextPaymentTime"
                                    value={values.periodicCost.nextPaymentTime}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="cost">
                                Cost
                                <input
                                    id="cost"
                                    type="number"
                                    name="cost"
                                    value={values.periodicCost.cost}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="periodicType">
                                Type
                                <input
                                    id="periodicType"
                                    type="string"
                                    name="periodicType"
                                    value={values.periodicCost.periodicType}
                                    onChange={handleValueChange}
                                />
                            </label>
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        className={styles.button}
                        type="submit"
                        disabled={buttonClicked}
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

export default PeriodicCostCard;
