import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INewOrder } from "../interfaces/newOrder";
import sendNewOrder from "../services/sendNewOrder";

const initialState: INewOrder = {
    rentalCost: 0,
    rentPerDay: 0,
    startDate: "",
    endDate: "",
    pickUpLocation: "",
    dropOffLocation: "",
    status: "",
    vehicleId: "",
    isNewOrderUploaded: "initial",
};

export const createNewOrder = createAsyncThunk(
    "order/createNewOrder",
    async (payload: INewOrder) => {
        const response = await sendNewOrder(payload);
        return response;
    }
);

export const newOrder = createSlice({
    name: "newOrder",
    initialState,
    reducers: {
        handleFormValueChange: (state, action) => action.payload,
        resetRequest: (state, action) => {
            state.isNewOrderUploaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isNewOrderUploaded = "fulfilled";
            })
            .addCase(createNewOrder.pending, (state, action) => {
                state.isNewOrderUploaded = "pending";
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isNewOrderUploaded = "rejected";
            });
    },
});

export const { handleFormValueChange, resetRequest } = newOrder.actions;

export default newOrder.reducer;
