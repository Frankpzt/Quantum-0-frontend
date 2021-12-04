import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INewTask } from "../interfaces/newTask";
import sendNewTask from "../services/sendNewTask";

const initialState: INewTask = {
    name: "",
    checked: false,
    assignee: "",
    reporter: "",
    start: "",
    end: "",
    priority: "",
    note: "",
    isNewTaskUploaded: "initial",
};

export const createNewTask = createAsyncThunk(
    "task/createNewTask",
    async (payload: INewTask) => {
        const response = await sendNewTask(payload);
        return response;
    }
);

export const newTaskSlice = createSlice({
    name: "createNewTask",
    initialState,
    reducers: {
        handleTaskFormValueChange: (state, action) => action.payload,
        resetRequest: (state, action) => {
            state.isNewTaskUploaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewTask.fulfilled, (state, action) => {
                state.isNewTaskUploaded = "fulfilled";
            })
            .addCase(createNewTask.pending, (state, action) => {
                state.isNewTaskUploaded = "pending";
            })
            .addCase(createNewTask.rejected, (state, action) => {
                state.isNewTaskUploaded = "rejected";
            });
    },
});

export const { handleTaskFormValueChange, resetRequest } = newTaskSlice.actions;

export default newTaskSlice.reducer;
