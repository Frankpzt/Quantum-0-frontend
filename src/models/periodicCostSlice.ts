import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPeriodicCost } from "../interfaces/periodicCost";
import sendPeriodicCost from "../services/sendPeriodicCost";

const initialState: IPeriodicCost = {
    id: "",
    periodicCost: {
        periodicType: "",
        cost: 0,
        date: "",
        nextPaymentTime: "",
    },
    isPeriodicCostUploaded: "initial",
};

export const createPeriodicRecord = createAsyncThunk(
    "vehicle/createPeriodicCost",
    async (payload: IPeriodicCost) => {
        const response = await sendPeriodicCost(payload);
        return response;
    }
);

export const periodicCost = createSlice({
    name: "periodicCost",
    initialState,
    reducers: {
        handleFormValueChange: (state, action) => action.payload,
        resetRequest: (state, action) => {
            state.isPeriodicCostUploaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPeriodicRecord.fulfilled, (state, action) => {
                state.isPeriodicCostUploaded = "fulfilled";
            })
            .addCase(createPeriodicRecord.pending, (state, action) => {
                state.isPeriodicCostUploaded = "pending";
            })
            .addCase(createPeriodicRecord.rejected, (state, action) => {
                state.isPeriodicCostUploaded = "rejected";
            });
    },
});

export const { handleFormValueChange, resetRequest } = periodicCost.actions;

export default periodicCost.reducer;
