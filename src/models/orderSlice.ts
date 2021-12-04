import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orders, orderIds } from "../interfaces/orders";
import getorderByIds from "../services/order";

const initialState: orders = {
    data: [],
};

export const fetchOrderByIds = createAsyncThunk(
    "order/fetchOrderByIds",
    async (ids: orderIds) => {
        const response = await getorderByIds(ids);
        return response.data;
    }
);

export const orderDetails = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrderByIds.fulfilled, (state, action) => {
            state.data = [];
            action.payload.orders.forEach((order: any) => {
                const rentalDays =
                    (Date.parse(order.endDate) - Date.parse(order.startDate)) /
                    (1000 * 60 * 60 * 24);
                state.data.push({
                    orderId: order.orderId,
                    dailyCost: order.rentPerDay?.$numberDecimal,
                    startDate: order.startDate,
                    endDate: order.endDate,
                    rentalDays,
                    pickupLocation: order.pickUpLocation,
                    dropoffLocation: order.dropOffLocation,
                    total: (
                        parseFloat(order.rentPerDay?.$numberDecimal) *
                        rentalDays
                    ).toString(),
                    status: order.status,
                });
            });
        });
    },
});

export default orderDetails.reducer;
