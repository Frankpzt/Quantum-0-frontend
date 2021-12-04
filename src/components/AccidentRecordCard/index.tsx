import React, { ReactElement, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccidentRecordCardStyle from "./AccidentRecordCard.module.scss";
import {
    createAccidentRecord,
    handleFormValueChange,
    resetRequest,
} from "../../models/accidentRecordSlice";
import { RootState } from "../../interfaces/redux";

interface AccidentRecordProps {
    visible: boolean;
    setVisible: () => void;
    setNotVisible: () => void;
    vehicleId: string;
}

const AccidentRecordCard: React.FC<AccidentRecordProps> = ({
    visible,
    setVisible,
    setNotVisible,
    vehicleId,
}): ReactElement => {
    const [values, setValues] = useState({
        id: vehicleId,
        accidentRecord: {
            time: "",
            location: "",
            cost: 0,
            responsible: "",
            insurance: "",
            relatedOrder: "",
            description: "",
        },
    });
    const isAccidentRecordUploaded = useSelector(
        (state: RootState) => state.accidentRecord.isAccidentRecordUploaded
    );
    const [buttonClicked, setButtonClicked] = useState(false);
    useEffect(
        () => () => {
            setButtonClicked(false);
        },
        []
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (isAccidentRecordUploaded === "fulfilled" && buttonClicked) {
            setTimeout(() => {
                setNotVisible();
                dispatch(resetRequest("initial"));
            }, 1000);
        }
        if (isAccidentRecordUploaded === "rejected") {
            setVisible();
        }
    }, [
        buttonClicked,
        isAccidentRecordUploaded,
        setNotVisible,
        setVisible,
        dispatch,
    ]);

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        dispatch(handleFormValueChange(values));
        dispatch(createAccidentRecord(values));
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
            accidentRecord: {
                ...values.accidentRecord,
                [e.target.name]: valueToBeSet,
            },
        });
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setValues({
            ...values,
            accidentRecord: {
                ...values.accidentRecord,
                [e.target.name]: e.target.value,
            },
        });
    };

    return (
        <div className={AccidentRecordCardStyle.container}>
            <IconButton
                className={AccidentRecordCardStyle.closeButton}
                onClick={setNotVisible}
            >
                <CloseIcon />
            </IconButton>

            <div className={AccidentRecordCardStyle.content}>
                {isAccidentRecordUploaded === "rejected" && (
                    <h3 className={AccidentRecordCardStyle.errorMsg}>
                        Failed to create the record, please check your
                        connection.
                    </h3>
                )}
                <h2>Accident Record</h2>
                <form onSubmit={handleSubmit}>
                    <div className={AccidentRecordCardStyle.firstRow}>
                        <div className={AccidentRecordCardStyle.firstCol}>
                            <div>
                                <label htmlFor="time">
                                    Time happened
                                    <input
                                        id="time"
                                        type="datetime-local"
                                        name="time"
                                        value={values.accidentRecord.time}
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
                                        value={values.accidentRecord.cost}
                                        onChange={handleValueChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="insurance">
                                    Insurance
                                    <input
                                        id="insurance"
                                        type="string"
                                        name="insurance"
                                        value={values.accidentRecord.insurance}
                                        onChange={handleValueChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={AccidentRecordCardStyle.secondCol}>
                            <div>
                                <label htmlFor="location">
                                    Location
                                    <input
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={values.accidentRecord.location}
                                        onChange={handleValueChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="responsible">
                                    Responsible
                                    <input
                                        id="responsible"
                                        type="text"
                                        name="responsible"
                                        value={
                                            values.accidentRecord.responsible
                                        }
                                        onChange={handleValueChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="relatedOrder">
                                    Related rental order
                                    <input
                                        id="relatedOrder"
                                        type="text"
                                        name="relatedOrder"
                                        value={
                                            values.accidentRecord.relatedOrder
                                        }
                                        onChange={handleValueChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={AccidentRecordCardStyle.secondRow}>
                        <div className={AccidentRecordCardStyle.description}>
                            <label htmlFor="description">
                                Description
                                <textarea
                                    id="description"
                                    className={AccidentRecordCardStyle.textArea}
                                    name="description"
                                    value={values.accidentRecord.description}
                                    onChange={handleDescriptionChange}
                                />
                            </label>
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        className={AccidentRecordCardStyle.button}
                        type="submit"
                        disabled={buttonClicked}
                    >
                        {!buttonClicked ? (
                            <div
                                className={AccidentRecordCardStyle.button_text}
                            >
                                Create
                            </div>
                        ) : (
                            <CircularProgress
                                color="inherit"
                                className={
                                    AccidentRecordCardStyle.circularProgress
                                }
                            />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AccidentRecordCard;
