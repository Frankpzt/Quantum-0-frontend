import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inventory from "../interfaces/inventory";
import getAllVehicles from "../services/inventory";

const initialState: inventory = {
    data: [],
};

export const fetchAllVehicles = createAsyncThunk(
    "inventory/getAllVehicles",
    async () => {
        const response = await getAllVehicles();
        return response.data;
    }
);

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllVehicles.fulfilled, (state, action) => {
            state.data = [];
            action.payload.forEach((vehicle: any) => {
                state.data.push({
                    ID: vehicle.vehicleId,
                    Make: vehicle.make,
                    Year: vehicle.year,
                    Mile: vehicle.miles.$numberDecimal,
                    Body: vehicle.body,
                    Color: vehicle.color,
                    Seats: vehicle.seats,
                    Transmission: vehicle.transmission,
                    totalRentDay: vehicle.totalRentDay,
                    dailyRent: vehicle.dailyRent?.$numberDecimal,
                    cost: "0",
                    earn: "0",
                    orderId: vehicle.orderId,
                    periodicCost: vehicle.periodicCost,
                    accidentRecord: vehicle.accidentRecord,
                });
            });
        });
    },
});

export default inventorySlice.reducer;
