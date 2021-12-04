import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewCarBasicDetail } from "../interfaces/carBasicDetail";
import { createNewVehicle } from "../services/carDetail";

const initialState: NewCarBasicDetail = {
    make: "",
    registerNumber: "",
    plate: "",
    year: 0,
    miles: 0,
    body: "",
    color: "",
    seats: 0,
    transmission: "",
    totalRentDay: 0,
    dailyRent: 0,
    isNewVehicleUploaded: "initial",
};

export const createVehicle = createAsyncThunk(
    "vehicle/createVehicle",
    async (payload: NewCarBasicDetail) => {
        const response = createNewVehicle(payload);
        return response;
    }
);

export const newVehicle = createSlice({
    name: "newVehicle",
    initialState,
    reducers: {
        handleFormValueChange: (state, action) => action.payload,
        resetRequest: (state, action) => {
            state.isNewVehicleUploaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createVehicle.fulfilled, (state, action) => {
                state.isNewVehicleUploaded = "fulfilled";
            })
            .addCase(createVehicle.pending, (state, action) => {
                state.isNewVehicleUploaded = "pending";
            })
            .addCase(createVehicle.rejected, (state, action) => {
                state.isNewVehicleUploaded = "rejected";
            });
    },
});

export const { handleFormValueChange, resetRequest } = newVehicle.actions;

export default newVehicle.reducer;
