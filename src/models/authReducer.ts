import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../services/auth";
import { IAuthFormValues, RootState } from "../interfaces/redux";

export const loadAuthenticationRequest = createAsyncThunk(
    "auth/request",
    async (formValues: IAuthFormValues) => {
        let response;
        if (formValues.firstname) {
            response = await signUp(formValues);
        } else {
            response = await login(formValues);
        }
        return response;
    }
);

interface IAuthState {
    isAuthenticated: boolean | undefined;
    user: {
        firstName?: string | undefined;
        lastName?: string | undefined;
    };
    signUpStatus?: string;
    signInStatus?: string;
}

const auth = createSlice({
    name: "user/auth",
    initialState: {
        isAuthenticated: !!localStorage.getItem("token"),
        user: {},
        signUpStatus: "",
        signInStatus: "",
    } as IAuthState,
    reducers: {
        toggleSignUpStatus: (state) => {
            state.signUpStatus = "";
        },
        toggleSignInStatus: (state) => {
            state.signInStatus = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAuthenticationRequest.pending, () => ({
                isAuthenticated: false,
                user: {},
                signUpStatus: "pending",
            }))

            .addCase(loadAuthenticationRequest.fulfilled, (state, action) => {
                const firstName = action.payload.data.user.firstname;
                const lastName = action.payload.data.user.lastname;
                const userName = `${action.payload.data.user.firstname} ${action.payload.data.user.lastname}`;
                const { email, avatar } = action.payload.data.user;
                const authorizationToken = action.payload.headers.authorization;
                const token = JSON.stringify(authorizationToken);
                localStorage.setItem("token", token);
                localStorage.setItem("username", userName);
                localStorage.setItem("userFirstName", firstName);
                localStorage.setItem("userLastName", lastName);
                localStorage.setItem("userEmail", email);
                localStorage.setItem("avatar", avatar);
                return {
                    isAuthenticated: true,
                    user: {
                        firstName,
                        lastName,
                        email,
                    },
                    signUpStatus: "fulfilled",
                    signInStatus: "fulfilled",
                };
            })
            .addCase(loadAuthenticationRequest.rejected, () => ({
                isAuthenticated: false,
                user: {},
                signUpStatus: "rejected",
                signInStatus: "rejected",
            }));
    },
});

export const selectAuthState = (state: RootState) => state.auth.isAuthenticated;

export const selectSignUpStatus = (state: RootState) => state.auth.signUpStatus;

export const selectSignInStatus = (state: RootState) => state.auth.signInStatus;

export const { toggleSignUpStatus, toggleSignInStatus } = auth.actions;

export default auth.reducer;
