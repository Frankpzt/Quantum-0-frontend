import React from "react";
import styles from "./Task.module.scss";

interface TaskProps {
    title: string;
    time: string;
    className: "critical" | "important" | "normal";
}
const Task: React.FC<TaskProps> = ({ title, time, className }) => (
    <li className={styles[`${className}`]}>
        <div className={styles.title}>
            <span className={styles.label} />
            {title}
        </div>
        <div className={styles.time}>{time}</div>
    </li>
);

export default Task;
