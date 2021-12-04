import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import styles from "./MainSummaryPageDetail.module.scss";
import {
    fetchAllVehicles,
    fetchCarStock,
    fetchTotalProfit,
    fetchMonthProfit,
} from "../../../models/summarySlice";

const MainSummaryPageDetail: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllVehicles());
        dispatch(fetchCarStock());
        dispatch(fetchTotalProfit());
        dispatch(fetchMonthProfit());
    }, [dispatch]);
    const summary = useAppSelector((state) => state.summary.data);

    return (
        <div className={styles.container}>
            {summary.map((item, index) => (
                <div className={styles.container_box} key={Math.random()}>
                    <div>{item.title}</div>
                    {index > 1 ? (
                        <div className={styles.container_box_content}>
                            {`$ ${item.data}`}
                        </div>
                    ) : (
                        <div className={styles.container_box_content}>
                            {item.data}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MainSummaryPageDetail;
