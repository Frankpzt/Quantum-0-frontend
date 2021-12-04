import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllVehicles } from "../../models/inventorySlice";
import CarCard from "../../components/CarCard";
import NewVehicleModal from "../../components/NewVehicleModal/NewVehicleModal";
import AddButton from "../../components/AddButton/AddButton";
import styles from "./Inventory.module.scss";

const Inventory = () => {
    const dispatch = useAppDispatch();
    // create new vehicle modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(fetchAllVehicles());
    }, [dispatch, open]);
    const cars = useAppSelector((state) => state.inventory.data);

    return (
        <div>
            <NewVehicleModal open={open} handleClose={handleClose} />
            <div className={styles.box}>
                <AddButton value="New car" onClick={handleOpen} />
            </div>
            <CarCard cars={cars} />
        </div>
    );
};

export default Inventory;
