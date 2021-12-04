import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import summary from "../interfaces/summary";
import {
    getAllVehicles,
    getCarStock,
    getTotalProfit,
    getMonthProfit,
} from "../services/summary";

const initialState: summary = {
    data: [],
};

export const fetchAllVehicles = createAsyncThunk(
    "summary/getAllVehicles",
    async () => {
        const response = await getAllVehicles();
        return response.data.length;
    }
);

export const fetchCarStock = createAsyncThunk(
    "summary/getCarStock",
    async () => {
        const response = await getCarStock();
        return response.data;
    }
);

export const fetchTotalProfit = createAsyncThunk(
    "summary/getTotalProfit",
    async () => {
        const response = await getTotalProfit();
        return response.data;
    }
);

export const fetchMonthProfit = createAsyncThunk(
    "summary/getMonthProfit",
    async () => {
        const response = await getMonthProfit();
        return response.data;
    }
);

export const summarySlice = createSlice({
    name: "summary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllVehicles.fulfilled, (state, action) => {
            state.data = [];
            state.data.push({
                title: "Total Number of Cars:",
                data: action.payload,
            });
        });

        builder.addCase(fetchCarStock.fulfilled, (state, action) => {
            state.data.push({
                title: "Cars in Stock:",
                data: action.payload,
            });
        });

        builder.addCase(fetchTotalProfit.fulfilled, (state, action) => {
            state.data.push({
                title: "Total Earn:",
                data: action.payload,
            });
        });

        builder.addCase(fetchMonthProfit.fulfilled, (state, action) => {
            state.data.push({
                title: "Monthly Earn:",
                data: action.payload,
            });
        });
    },
});
export default summarySlice.reducer;
