import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Calendar.module.scss";
import {
    getCalendarDates,
    getYear,
    getMonth,
    getFirstDayInMonth,
    getLastDateInMonth,
} from "../../services/calendar";
import AddButton from "../../components/AddButton/AddButton";
import Task from "./Task/Task";
import { fetchAllTasksByYearAndMonth } from "../../models/taskSlice";
import { Task as TaskInterface } from "../../interfaces/tasks";
import CreateNewTaskCard from "../../components/CreateNewTaskCard";

const Calendar = () => {
    const dispatch = useAppDispatch();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date();
    const [year, setYear] = useState(getYear(date));
    const [month, setMonth] = useState(getMonth(date));
    const todayDate = date.getDate();
    const thisMonth = getMonth(date);
    const isToday = (dateToCompare: number) => {
        if (month === thisMonth && dateToCompare === todayDate) {
            return true;
        }
        return false;
    };
    const monthName = new Date(year, month, 1).toLocaleString("default", {
        month: "long",
    });
    const monthStartIndex = getFirstDayInMonth(year, month);
    const monthEndIndex = monthStartIndex + getLastDateInMonth(year, month) - 1;

    // add new task modal
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const setTaskModalIsVisible = () => {
        setTaskModalVisible(true);
    };
    const setTaskModalNotVisible = () => {
        setTaskModalVisible(false);
    };

    useEffect(() => {
        const payload = { year, month };
        dispatch(fetchAllTasksByYearAndMonth(payload));
    }, [dispatch, month, year, taskModalVisible]);

    const tasksInMonth = useAppSelector((state) => state.task);
    const tasksInDate: any = {};
    // gather data by date
    tasksInMonth.data.forEach((task: TaskInterface) => {
        const taskDate = new Date(task.start).getDate().toString();
        if (taskDate in tasksInDate) {
            tasksInDate[taskDate].push(task);
        } else {
            tasksInDate[taskDate] = [];
            tasksInDate[taskDate].push(task);
        }
    });

    // sort data by time
    Object.keys(tasksInDate).forEach((key) => {
        tasksInDate[key].sort(
            (taskA: TaskInterface, taskB: TaskInterface) =>
                new Date(taskA.start).getTime() -
                new Date(taskB.start).getTime()
        );
    });
    const isTaskNeedRender = (dateLabel: number, index: number) => {
        if (
            dateLabel in tasksInDate &&
            index >= monthStartIndex &&
            index <= monthEndIndex
        ) {
            return true;
        }
        return false;
    };
    const prevMonth = () => {
        setMonth((prevState) => prevState - 1);
    };
    const nextMonth = () => {
        setMonth((prevState) => prevState + 1);
    };
    const backToToday = () => {
        setYear(getYear(date));
        setMonth(getMonth(date));
    };

    return (
        <div className={styles.container}>
            <section>
                <div className={styles.box}>
                    <div>
                        <button type="button" onClick={prevMonth}>
                            <FiChevronLeft />
                        </button>
                        <button type="button" onClick={backToToday}>
                            Today
                        </button>
                        <button type="button" onClick={nextMonth}>
                            <FiChevronRight />
                        </button>
                    </div>
                    <div className={styles.dateString}>
                        {monthName} {year}
                    </div>
                </div>
            </section>
            <ul className={styles.row}>
                <div className={styles.dayRow}>
                    {weekdays.map((day) => (
                        <li key={day} className={styles.day}>
                            {day}
                            {day === "Sat" && (
                                <div className={styles.addButton}>
                                    <AddButton
                                        value="New Task"
                                        onClick={setTaskModalIsVisible}
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </div>
            </ul>
            <ul className={styles.dateContainer}>
                <div className={styles.dateRow}>
                    {getCalendarDates(year, month).map((dateInMonth, index) => (
                        <button
                            className={styles.date}
                            type="button"
                            key={dateInMonth.value}
                        >
                            <li
                                className={
                                    // eslint-disable-next-line no-nested-ternary
                                    index < monthStartIndex
                                        ? styles.inactive
                                        : index > monthEndIndex
                                        ? styles.inactive
                                        : styles.active
                                }
                            >
                                <span
                                    className={
                                        isToday(dateInMonth.label)
                                            ? styles.today
                                            : ""
                                    }
                                >
                                    {dateInMonth.label}
                                </span>
                                &nbsp;
                                <ul className={styles.tasks}>
                                    {isTaskNeedRender(
                                        dateInMonth.label,
                                        index
                                    ) &&
                                        tasksInDate[dateInMonth.label].map(
                                            (taskInDate: TaskInterface) => {
                                                const time = new Date(
                                                    taskInDate.start
                                                ).toLocaleTimeString();
                                                return (
                                                    <div key={taskInDate.id}>
                                                        <Task
                                                            title={
                                                                taskInDate.name
                                                            }
                                                            time={time}
                                                            className={
                                                                taskInDate.priority
                                                            }
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                </ul>
                            </li>
                        </button>
                    ))}
                </div>
            </ul>
            {/* new task modal */}
            {taskModalVisible && (
                <CreateNewTaskCard
                    visible={taskModalVisible}
                    setVisible={setTaskModalIsVisible}
                    setNotVisible={setTaskModalNotVisible}
                />
            )}
        </div>
    );
};

export default Calendar;
