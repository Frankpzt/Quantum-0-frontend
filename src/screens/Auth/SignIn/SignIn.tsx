import React, { useState, useEffect } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { HiOutlineExclamation } from "react-icons/hi";
import "../../../assets/styles/variable.scss";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import AuthInputField from "../../../components/AuthInputField";
import AuthDialog from "../../../components/AuthDialog";
import ValidateInfo from "../../../utils/ValidateInfo";
import styles from "./SignIn.module.scss";
import {
    loadAuthenticationRequest,
    selectSignInStatus,
    toggleSignUpStatus,
} from "../../../models/authReducer";
import { useAppSelector } from "../../../hooks/redux";

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const signInStatus = useAppSelector(selectSignInStatus);

    const [checked, setChecked] = React.useState(false);

    const [authValues, setValues] = React.useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (localStorage.getItem("remember") === "true") {
            const email = localStorage.getItem("email");
            const password = localStorage.getItem("password");
            if (email && password) {
                setValues({ email, password });
            }
        }
    }, []);

    useEffect(() => {
        if (signInStatus === "fulfilled") {
            history.push("./dashboard");
        }
        if (signInStatus === "rejected") {
            dispatch(toggleSignUpStatus());
        }
    }, [signInStatus, dispatch, history]);

    useEffect(() => {
        // @ts-ignore
        if (errors.isValidated) {
            dispatch(loadAuthenticationRequest(authValues));
            setErrors({});
        }
    }, [errors, authValues, dispatch]);
    const formTitles = [
        {
            password: false,
            icon: <FiMail />,
            title: "email",
            label: "Email Address",
            type: "text",
            id: 1,
        },
        {
            password: true,
            icon: <FiLock />,
            visibleIcon: <FiEye />,
            invisibleIcon: <FiEyeOff />,
            title: "password",
            label: "Password",
            type: "password",
            id: 2,
        },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...authValues, [e.target.name]: e.target.value });
    };

    const handleLocalStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setChecked(!checked);
            localStorage.setItem("email", authValues.email);
            localStorage.setItem("password", authValues.password);
            localStorage.setItem("remember", "true");
        } else {
            setChecked(!checked);
            localStorage.clear();
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setErrors(ValidateInfo(authValues));
    };

    return (
        <Box className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formItems}>
                    <h3>Welcome Back</h3>
                    <p>Sign in to continue</p>
                </div>

                <AuthInputField
                    titles={formTitles}
                    change={handleChange}
                    errors={errors}
                    values={authValues}
                />

                <div className={styles.formFooterItems}>
                    <AuthDialog
                        buttonContent="Forgot password?"
                        titles="Forgot your password?"
                        content="Please contact website admins to get your
                        password."
                    />
                    <br />
                    <AuthDialog
                        buttonContent="Find password format?"
                        titles="Your password should have..."
                        content="A minimum 8 characters password contains a combination of
                        uppercase and lowercase letter, special character and number."
                    />
                </div>

                <div className={styles.formItems}>
                    <div>
                        {signInStatus === "rejected" && (
                            <div className={styles.invalidField}>
                                <div className={styles.iconExclaimation}>
                                    <HiOutlineExclamation
                                        color="$authErrorColor"
                                        size="20px"
                                    />
                                </div>
                                Sorry! Incorrect email or password! Try again.
                            </div>
                        )}
                    </div>
                    <button
                        className={styles.btn}
                        type="submit"
                        onSubmit={handleSubmit}
                    >
                        Sign In
                    </button>
                    <label className={styles.saveInfo} htmlFor="savePassword">
                        <input
                            type="checkbox"
                            id="savePassword"
                            className={styles.saveInfoCheckbox}
                            name="rememberMe"
                            checked={checked}
                            onChange={handleLocalStorage}
                        />
                        Remember me
                    </label>
                </div>
            </form>
        </Box>
    );
};

export default SignIn;
