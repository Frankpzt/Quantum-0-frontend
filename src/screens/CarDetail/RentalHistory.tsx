import { useEffect } from "react";
import { fetchOrderByIds } from "../../models/orderSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { orderIds } from "../../interfaces/orders";
import DisplayField from "./DisplayField/DisplayField";
import styles from "./CarDetail.module.scss";
import AddButton from "../../components/AddButton/AddButton";

function RentailHistory() {
    const carDetails = useAppSelector((state) => state.vehicle);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const idsProp: orderIds = {
            ids: carDetails.orderId,
        };
        dispatch(fetchOrderByIds(idsProp));
    }, [dispatch, carDetails]);

    const orders = useAppSelector((state) => state.order);
    return (
        <div className={styles.rentalHistory}>
            <div className={styles.title}>
                <h2>Rental History</h2>
                <AddButton value="New Record" />
            </div>
            <div className={styles.tableWrapper}>
                <div className={styles.tableScroll}>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span>Order ID</span>
                                </th>
                                <th>
                                    <span>Daily Cost</span>
                                </th>
                                <th>
                                    <span>Start Date</span>
                                </th>
                                <th>
                                    <span>End Date</span>
                                </th>
                                <th>
                                    <span>Rental Days</span>
                                </th>
                                <th>
                                    <span>Pickup Location</span>
                                </th>
                                <th>
                                    <span>Dropoff Location</span>
                                </th>
                                <th>
                                    <span>Total</span>
                                </th>
                                <th>
                                    <span>Status</span>
                                </th>
                            </tr>
                        </thead>
                        {orders.data.map((order, index) => (
                            <tr key={order.orderId}>
                                <td>
                                    <DisplayField value={index + 1} />
                                </td>
                                <td>
                                    <DisplayField value={order.dailyCost} />
                                </td>
                                <td>
                                    <DisplayField value={order.startDate} />
                                </td>
                                <td>
                                    <DisplayField value={order.endDate} />
                                </td>
                                <td>
                                    <DisplayField value={order.rentalDays} />
                                </td>
                                <td>
                                    <DisplayField
                                        value={order.pickupLocation}
                                    />
                                </td>
                                <td>
                                    <DisplayField
                                        value={order.dropoffLocation}
                                    />
                                </td>
                                <td>
                                    <DisplayField value={order.total} />
                                </td>
                                <td>
                                    <DisplayField value={order.status} />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RentailHistory;
