import React from "react";
import MainSummaryPageDetail from "../MainSummaryPageDetail";
import styles from "./MainSummaryPage.module.scss";

const MainSummaryPage: React.FC = () => (
    <div className={styles.main}>
        <MainSummaryPageDetail />
    </div>
);

export default MainSummaryPage;
