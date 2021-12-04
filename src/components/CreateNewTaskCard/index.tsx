import React, { ReactElement, useEffect, useState } from "react";

import {
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import FormControlLabel from "@mui/material/FormControlLabel";

import Switch from "@mui/material/Switch";

import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.scss";
import {
    createNewTask,
    handleTaskFormValueChange,
} from "../../models/newTaskSlice";

import { INewTask } from "../../interfaces/newTask";

import { RootState } from "../../interfaces/redux";

interface CreateNewTaskCardProps {
    visible: boolean;

    setVisible: () => void;

    setNotVisible: () => void;
}

const CreateNewTaskCard: React.FC<CreateNewTaskCardProps> = ({
    visible,

    setVisible,

    setNotVisible,
}): ReactElement => {
    const [buttonClicked, setButtonClicked] = useState(false);

    const [fromTime, setFromTime] = useState("");

    const [toTime, setToTime] = useState("");

    const [formValues, setValues] = useState({
        title: "",

        checked: false,

        assignee: "",

        reporter: "",

        fromDate: "",

        toDate: "",

        fromTime: "",

        toTime: "",

        priority: "",

        notes: "",
    });

    const [allDayIsOn, setAllDayIsOn] = useState(false);
    const [dateInfoIsNull, setDateInfoIsNull] = useState(false);
    const handlePriorityChange = (e: SelectChangeEvent) => {
        setValues({ ...formValues, priority: e.target.value });
    };

    const handleCheckedChange = () => {
        setValues({ ...formValues, checked: !formValues.checked });
    };

    const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const isNewTaskUploaded = useSelector(
        (state: RootState) => state.newTask.isNewTaskUploaded
    );

    useEffect(() => {
        if (isNewTaskUploaded === "fulfilled" && buttonClicked) {
            setTimeout(() => {
                setNotVisible();
            }, 1200);
        }
        if (isNewTaskUploaded === "rejected") {
            setVisible();
        }
    }, [buttonClicked, isNewTaskUploaded, setNotVisible, setVisible]);

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        const startTimeWhenAllDayIsOn = fromTime;

        const endTimeWhenAllDayIsOn = toTime;

        if (
            (startTimeWhenAllDayIsOn === "" && formValues.fromTime === "") ||
            (endTimeWhenAllDayIsOn === "" && formValues.toTime === "") ||
            formValues.fromDate === "" ||
            formValues.toDate === ""
        ) {
            setDateInfoIsNull(true);
            return;
        }
        setDateInfoIsNull(false);
        const formValuesToBeSent: INewTask = {
            name: formValues.title,

            checked: formValues.checked,

            assignee: formValues.assignee,

            reporter: formValues.reporter,

            start: startTimeWhenAllDayIsOn
                ? `${formValues.fromDate}T${fromTime}`
                : `${formValues.fromDate}T${formValues.fromTime}`,

            end: endTimeWhenAllDayIsOn
                ? `${formValues.toDate}T${toTime}`
                : `${formValues.toDate}T${formValues.toTime}`,

            priority: formValues.priority,

            note: formValues.notes,

            isNewTaskUploaded,
        };

        e.preventDefault();

        dispatch(handleTaskFormValueChange(formValuesToBeSent));

        dispatch(createNewTask(formValuesToBeSent));

        setButtonClicked(true);
    };

    useEffect(() => {
        if (allDayIsOn) {
            setFromTime("00:00");

            setToTime("23:59");
        } else {
            setFromTime("");

            setToTime("");
        }
    }, [allDayIsOn]);

    const toggleAllDay = () => {
        setAllDayIsOn(!allDayIsOn);
    };

    return (
        <div className={styles.container}>
            <header>
                <Typography className={styles.title}>Create Task </Typography>

                {isNewTaskUploaded === "rejected" && (
                    <h4 className={styles.errorMsg}>Connection error...</h4>
                )}

                <IconButton
                    className={styles.closeButton}
                    onClick={setNotVisible}
                >
                    <CloseIcon className={styles.closeIcon} />
                </IconButton>
            </header>

            <main>
                <div className={styles.firstRow}>
                    <h3>Title and People involved</h3>

                    <div className={styles.firstRow_firstSection}>
                        <div className={styles.firstRow_firstInput}>
                            <label htmlFor="title">
                                Title <br />
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g Collect vehicle #001"
                                    onChange={handleFormValueChange}
                                />
                            </label>
                        </div>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    value={formValues.checked}
                                    onChange={handleCheckedChange}
                                />
                            }
                            label="Checked"
                            className={styles.firstRow_secondInput}
                        />
                    </div>
                    <div className={styles.firstRow_secondSection}>
                        <div>
                            <label htmlFor="assignee">
                                Assignee (optional) <br />
                                <input
                                    type="text"
                                    name="assignee"
                                    placeholder="name"
                                    onChange={handleFormValueChange}
                                />
                            </label>
                        </div>

                        <div className={styles.firstRow_fourthInput}>
                            <label htmlFor="reporter">
                                Reporter <br />
                                <input
                                    type="text"
                                    name="reporter"
                                    placeholder="name"
                                    onChange={handleFormValueChange}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.secondRow}>
                    <h3>Date and Time</h3>
                    {dateInfoIsNull && (
                        <h4 className={styles.dateValidationMsg}>
                            You must provide a date and time range for this
                            task.
                        </h4>
                    )}
                    <div className={styles.secondRow_firstSection}>
                        <div className={styles.secondRow_firstInput}>
                            <label htmlFor="fromDate">
                                From <br />
                                <input
                                    type="date"
                                    name="fromDate"
                                    onChange={handleFormValueChange}
                                />
                            </label>
                        </div>

                        <div className={styles.secondRow_secondInput}>
                            <label htmlFor="toDate">
                                To <br />
                                <input
                                    type="date"
                                    name="toDate"
                                    onChange={handleFormValueChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className={styles.secondRow_secondSection}>
                        <FormControlLabel
                            control={
                                <Switch size="small" onChange={toggleAllDay} />
                            }
                            label="All day"
                            labelPlacement="start"
                            className={styles.secondRow_thirdInput}
                        />

                        <div className={styles.secondRow_fourthInput}>
                            <label htmlFor="fromTime">
                                From <br />
                                <input
                                    type="time"
                                    name="fromTime"
                                    value={
                                        allDayIsOn
                                            ? "00:00"
                                            : formValues.fromTime
                                    }
                                    onChange={handleFormValueChange}
                                    disabled={allDayIsOn}
                                />
                            </label>
                        </div>

                        <div className={styles.secondRow_fifthInput}>
                            <label htmlFor="toTime">
                                To <br />
                                <input
                                    type="time"
                                    name="toTime"
                                    value={
                                        allDayIsOn ? "23:59" : formValues.toTime
                                    }
                                    onChange={handleFormValueChange}
                                    disabled={allDayIsOn}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.thirdRow}>
                    <h3>Priority and Notes</h3>

                    <FormControl className={styles.thirdRow_firstInput}>
                        <InputLabel id="priority-label">Priority</InputLabel>

                        <Select
                            labelId="priority-label"
                            id="demo-simple-select"
                            value={formValues.priority}
                            label="Priority"
                            onChange={handlePriorityChange}
                            className={styles.selectInput}
                        >
                            <MenuItem value="critical">
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
                                <span className={styles.tag_urgent}>
                                    &nbsp;Urgent
                                </span>
                            </MenuItem>
                            <MenuItem value="important">
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
                                <span className={styles.tag_important}>
                                    &nbsp;Important
                                </span>
                            </MenuItem>

                            <Divider />
                            <MenuItem value="normal">
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
                                <span className={styles.tag_normal}>
                                    &nbsp;Normal
                                </span>
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <div className={styles.thirdRow_secondInput}>
                        <label htmlFor="notes">
                            Notes (optional) <br />
                            <input
                                type="text"
                                name="notes"
                                placeholder="Describe the task in few words..."
                                onChange={handleFormValueChange}
                            />
                        </label>
                    </div>
                </div>
            </main>

            <Divider />

            <footer>
                <Button
                    variant="contained"
                    className={styles.button_cancel}
                    type="button"
                >
                    <div className={styles.button_cancel__text}>Cancel</div>
                </Button>
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
            </footer>
        </div>
    );
};

export default CreateNewTaskCard;
