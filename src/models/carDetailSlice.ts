import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carDetails from "../interfaces/carBasicDetail";
import getVehicleDetailById from "../services/carDetail";

const initialState: carDetails = {
    ID: "",
    Make: "",
    Year: 0,
    Mile: "",
    Body: "",
    Color: "",
    Seats: 0,
    Transmission: "",
    totalRentDay: 0,
    dailyRent: "0",
    cost: "0",
    earn: "0",
    orderId: [],
    periodicCost: [],
    accidentRecord: [],
};

export const fetchVehicleDetails = createAsyncThunk(
    "carDetail/fetchVehicleDetails",
    async (vehicleId: string) => {
        const response = await getVehicleDetailById(vehicleId);
        return response.data;
    }
);

export const carDetail = createSlice({
    name: "carDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVehicleDetails.fulfilled, (state, action) => ({
            ID: action.payload.vehicleId,
            Make: action.payload.make,
            Year: action.payload.year,
            Mile: action.payload.miles.$numberDecimal,
            Body: action.payload.body,
            Color: action.payload.color,
            Seats: action.payload.seats,
            Transmission: action.payload.transmission,
            totalRentDay: action.payload.totalRentDay,
            dailyRent: action.payload.dailyRent?.$numberDecimal,
            cost: "0",
            earn: "0",
            orderId: action.payload.orderId,
            periodicCost: action.payload.periodicCost,
            accidentRecord: action.payload.accidentRecord,
        }));
    },
});

export default carDetail.reducer;
