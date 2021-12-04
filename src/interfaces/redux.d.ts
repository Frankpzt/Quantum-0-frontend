import { ThunkAction, Action } from "@reduxjs/toolkit";
import store from "../app/store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export interface IAuthFormValues {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface IUserProfile {
    firstname: string;
    lastname: string;
    email: string | null;
    phoneNumber: string;
    currentPassword: string;
    newPassword: string;
}
