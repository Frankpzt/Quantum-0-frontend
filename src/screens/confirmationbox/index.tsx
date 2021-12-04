import React from "react";
import styles from "./conf_box.module.scss";

const Confirmbox: React.FC = () => (
    <div className={styles.box}>
        <div className={styles.box_top}>
            <span>Thank You For Your Registration</span>
        </div>

        <div className={styles.box_mid}>
            <div>YOUR ACCOUNT IS ALREADY SET UP. </div>
            <div>PROCESSING TO THE MANAGEMENT. </div>
            <div className={styles.box_mid_font}>
                PLEASE CHECK YOUR EMAIL FOR UPDATES.{" "}
            </div>
        </div>

        <div className={styles.box_bot}>
            <div className={styles.box_bot_font}>Done</div>
        </div>
    </div>
);

export default Confirmbox;
