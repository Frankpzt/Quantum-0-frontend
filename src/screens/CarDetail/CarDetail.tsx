import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import BasicDetail from "./BasicDetail";
import PeriodicCost from "./PeriodicCost";
import RentailHistory from "./RentalHistory";
import styles from "./CarDetail.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchVehicleDetails } from "../../models/carDetailSlice";

const CarDetail = () => {
    const dispatch = useAppDispatch();
    const location: { pathname: string; search: string } = useLocation();
    const vehicleId: string = location.search.replace("?", "");
    const periodicFlag = useAppSelector(
        (state) => state.periodicCost.isPeriodicCostUploaded
    );
    const accidentFlag = useAppSelector(
        (state) => state.accidentRecord.isAccidentRecordUploaded
    );
    useEffect(() => {
        dispatch(fetchVehicleDetails(vehicleId));
    }, [dispatch, vehicleId, periodicFlag, accidentFlag]);

    const carDetails = useAppSelector((state) => state.vehicle);
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.back}>
                <FiChevronLeft /> Back to inventory
            </Link>
            <div className={styles.notes}>
                *all changes will be automatically saved
            </div>
            <BasicDetail />
            <RentailHistory />
            <PeriodicCost
                periodicCostList={carDetails.periodicCost}
                accidentRecordList={carDetails.accidentRecord}
            />
        </div>
    );
};

export default CarDetail;
