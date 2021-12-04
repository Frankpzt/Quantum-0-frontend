import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userProfile from "../services/userProfile";
import { IUserProfile } from "../interfaces/redux";

export const UserProfileUpdater = createAsyncThunk(
    "user/profileUpdate",
    async (userProfileValues: IUserProfile) => {
        const response = await userProfile(userProfileValues);
        return response;
    }
);

interface IUserProfileState {
    setSucceed: boolean | undefined;
    user: {
        firstName: string | undefined;
        lastName: string | undefined;
    };
    loadStatus: string;
}

const updateUserProfile = createSlice({
    name: "user/updateProfile",
    initialState: {
        setSucceed: undefined,
        user: {},
        loadStatus: "",
    } as IUserProfileState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UserProfileUpdater.fulfilled, (state, action) => {
                const userFirstName = action.payload.data.user.firstname;
                const userLastName = action.payload.data.user.firstname;
                const userName = `${userFirstName} ${userLastName}`;
                const userEmail = action.payload.data.user.email;
                const userPhoneNumber = action.payload.data.user.phoneNumber;
                localStorage.setItem("userEmail", userEmail);
                localStorage.setItem("username", userName);
                localStorage.setItem("userPhoneNumber", userPhoneNumber);
                state.user = {
                    firstName: userFirstName,
                    lastName: userLastName,
                };
                state.setSucceed = true;
            })
            .addCase(UserProfileUpdater.rejected, (state, action) => {
                // @ts-ignore
                const errStatusCode = action.error.message.split(" ")[5];
                if (errStatusCode === "401") {
                    window.location.href = "login";
                }
                state.setSucceed = false;
            });
    },
});

export default updateUserProfile.reducer;
