import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../models/counter";
import carDetailReducer from "../models/carDetailSlice";
import authReducer from "../models/authReducer";
import inventoryReducer from "../models/inventorySlice";
import orderReducer from "../models/orderSlice";
import taskReducer from "../models/taskSlice";
import summaryReducer from "../models/summarySlice";
import accidentRecordReducer from "../models/accidentRecordSlice";
import userProfileReducer from "../models/userProfileSlice";
import periodicCostReducer from "../models/periodicCostSlice";
import newOrderReducer from "../models/newOrderSlice";
import newTaskReducer from "../models/newTaskSlice";
import newVehicleReducer from "../models/newVehicleSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        vehicle: carDetailReducer,
        auth: authReducer,
        inventory: inventoryReducer,
        order: orderReducer,
        task: taskReducer,
        summary: summaryReducer,
        accidentRecord: accidentRecordReducer,
        userProfile: userProfileReducer,
        periodicCost: periodicCostReducer,
        newOrder: newOrderReducer,
        newTask: newTaskReducer,
        newVehicle: newVehicleReducer,
    },
});

export default store;
