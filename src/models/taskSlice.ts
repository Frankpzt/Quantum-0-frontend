import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tasks } from "../interfaces/tasks";
import getAllTasksByYearAndMonth from "../services/task";

const initialState: Tasks = {
    data: [],
};

interface Payload {
    year: number;
    month: number;
}
export const fetchAllTasksByYearAndMonth = createAsyncThunk(
    "task/getAllTasksByYearAndMonth",
    async (payload: Payload) => {
        const response = await getAllTasksByYearAndMonth(
            payload.year,
            payload.month
        );
        return response.data;
    }
);

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchAllTasksByYearAndMonth.fulfilled,
            (state, action) => {
                state.data = [];
                action.payload.forEach((task: any) => {
                    state.data.push({
                        id: task.taskid,
                        name: task.name,
                        start: task.start,
                        end: task.end,
                        priority: task.priority,
                        checked: task.checked,
                        assignee: task.assignee,
                        reporter: task.reporter,
                        note: task.note,
                    });
                });
            }
        );
    },
});

export default taskSlice.reducer;
