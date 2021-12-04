import { useState } from "react";
import AccidentRecordCard from "../../components/AccidentRecordCard";
import CreateNewTaskCard from "../../components/CreateNewTaskCard";
import NewOrderCard from "../../components/NewOrderCard";
import PeriodicCostCard from "../../components/PeriodicCostCard";

const OrderHistory = () => {
    // const [accidentVisible, setAccidentVisible] = useState(false);
    // const [periodicVisible, setPeriodicVisible] = useState(false);
    // const [newTaskVisible, setNewTaskVisible] = useState(false);
    // const [newOrderVisible, setOrderVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const Vid = "584dcdeb-476f-42ee-ae27-78a15382bfe6";
    const setIsVisible = () => {
        setVisible(true);
    };

    const setNotVisible = () => {
        setVisible(false);
    };

    return (
        <div>
            {visible && (
                <PeriodicCostCard
                    visible={visible}
                    setVisible={setIsVisible}
                    setNotVisible={setNotVisible}
                    vehicleId={Vid}
                />
            )}
            <button type="button" onClick={setIsVisible}>
                test
            </button>
            <h1>This is the Order History page</h1>
        </div>
    );
};

export default OrderHistory;
