import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./CarDetail.module.scss";
import DisplayField from "./DisplayField/DisplayField";
import { periodicCost, accidentRecord } from "../../interfaces/carBasicDetail";
import AddButton from "../../components/AddButton/AddButton";
import PeriodicCostCard from "../../components/PeriodicCostCard";
import AccidentRecordCard from "../../components/AccidentRecordCard";

interface PeriodicCostProps {
    periodicCostList: periodicCost[];
    accidentRecordList: accidentRecord[];
}

const PeriodicCost: React.FC<PeriodicCostProps> = ({
    periodicCostList,
    accidentRecordList,
}) => {
    const location: { pathname: string; search: string } = useLocation();
    const vehicleId: string = location.search.replace("?", "");
    const [periodicModalVisible, setPeriodicModalVisible] = useState(false);
    const setPeriodicModalIsVisible = () => {
        setPeriodicModalVisible(true);
    };
    const setPeriodicModalNotVisible = () => {
        setPeriodicModalVisible(false);
    };

    const [accidentModalVisible, setAccidentModalVisible] = useState(false);
    const setAccidentModalIsVisible = () => {
        setAccidentModalVisible(true);
    };
    const setAccidentModalNotVisible = () => {
        setAccidentModalVisible(false);
    };
    return (
        <div className={styles.periodicCost}>
            <div className={styles.periodic}>
                <div className={styles.title}>
                    <h2>Periodic Cost</h2>
                    <AddButton
                        value="New Record"
                        onClick={setPeriodicModalIsVisible}
                    />
                </div>
                <div className={styles.tableWrapper}>
                    <div className={styles.tableScroll}>
                        <table>
                            <tr>
                                <th>
                                    <span>Type</span>
                                </th>
                                <th>
                                    <span>Cost</span>
                                </th>
                                <th>
                                    <span>Date</span>
                                </th>
                                <th>
                                    <span>Next payment time</span>
                                </th>
                            </tr>
                            {periodicCostList.map(
                                (cost: periodicCost, index: number) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <tr key={index}>
                                        <td>
                                            <DisplayField
                                                value={cost.periodicType}
                                            />
                                        </td>
                                        <td>
                                            <DisplayField
                                                value={cost.cost.$numberDecimal}
                                            />
                                        </td>
                                        <td>
                                            <DisplayField value={cost.date} />
                                        </td>
                                        <td>
                                            <DisplayField
                                                value={cost.nextPamentTime}
                                            />
                                        </td>
                                    </tr>
                                )
                            )}
                        </table>
                    </div>
                </div>
            </div>
            <div className={styles.accident}>
                <div className={styles.title}>
                    <h2>Accident Record</h2>
                    <AddButton
                        value="New Record"
                        onClick={setAccidentModalIsVisible}
                    />
                </div>
                <div className={styles.tableWrapper}>
                    <div className={styles.tableScroll}>
                        <table>
                            <tr>
                                <th>
                                    <span>Time</span>
                                </th>
                                <th>
                                    <span>Location</span>
                                </th>
                                <th>
                                    <span>Cost</span>
                                </th>
                                <th>
                                    <span>Responsible</span>
                                </th>
                                <th>
                                    <span>Insurance</span>
                                </th>
                            </tr>
                            <tbody className={styles.scroll}>
                                {accidentRecordList.map(
                                    (record: accidentRecord, index: number) => {
                                        const insurance = record.insurance
                                            ? "Covered"
                                            : "Uncovered";
                                        return (
                                            // eslint-disable-next-line react/no-array-index-key
                                            <tr key={index}>
                                                <td>
                                                    <DisplayField
                                                        value={record.time}
                                                    />
                                                </td>
                                                <td>
                                                    <DisplayField
                                                        value={record.location}
                                                    />
                                                </td>
                                                <td>
                                                    <DisplayField
                                                        value={
                                                            record.cost
                                                                .$numberDecimal
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <DisplayField
                                                        value={
                                                            record.responsible
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <DisplayField
                                                        value={insurance}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* periodic cost modal */}
            {periodicModalVisible && (
                <PeriodicCostCard
                    visible={periodicModalVisible}
                    setVisible={setPeriodicModalIsVisible}
                    setNotVisible={setPeriodicModalNotVisible}
                    vehicleId={vehicleId}
                />
            )}
            {/* accident record modal */}
            {accidentModalVisible && (
                <AccidentRecordCard
                    visible={accidentModalVisible}
                    setVisible={setAccidentModalIsVisible}
                    setNotVisible={setAccidentModalNotVisible}
                    vehicleId={vehicleId}
                />
            )}
        </div>
    );
};

export default PeriodicCost;
