import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAccidentRecord } from "../interfaces/accidentRecord";
import sendAccidentRecord from "../services/sendAccidentRecord";

const initialState: IAccidentRecord = {
    id: "",
    accidentRecord: {
        time: "",
        location: "",
        cost: 0,
        responsible: "",
        insurance: "",
        relatedOrder: "",
        description: "",
    },
    isAccidentRecordUploaded: "initial",
};

export const createAccidentRecord = createAsyncThunk(
    "vehicle/createAccidentRecord",
    async (payload: IAccidentRecord) => {
        const response = await sendAccidentRecord(payload);
        return response;
    }
);

export const accidentRecord = createSlice({
    name: "accidentRecord",
    initialState,
    reducers: {
        handleFormValueChange: (state, action) => action.payload,
        resetRequest: (state, action) => {
            state.isAccidentRecordUploaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccidentRecord.fulfilled, (state, action) => {
                state.isAccidentRecordUploaded = "fulfilled";
            })
            .addCase(createAccidentRecord.pending, (state, action) => {
                state.isAccidentRecordUploaded = "pending";
            })
            .addCase(createAccidentRecord.rejected, (state, action) => {
                state.isAccidentRecordUploaded = "rejected";
            });
    },
});

export const { handleFormValueChange, resetRequest } = accidentRecord.actions;

export default accidentRecord.reducer;
