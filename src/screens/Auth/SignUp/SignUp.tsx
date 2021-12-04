import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { HiOutlineExclamation } from "react-icons/hi";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styles from "./SignUp.module.scss";
import ValidateInfo from "../../../utils/ValidateInfo";
import AuthInputField from "../../../components/AuthInputField";
import AuthDialog from "../../../components/AuthDialog";
import {
    loadAuthenticationRequest,
    selectSignUpStatus,
    toggleSignInStatus,
} from "../../../models/authReducer";
import { useAppSelector } from "../../../hooks/redux";

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const signUpStatus = useAppSelector(selectSignUpStatus);

    const [authValues, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (signUpStatus === "fulfilled") {
            history.push("./dashboard");
        }
        if (signUpStatus === "rejected") {
            dispatch(toggleSignInStatus());
        }
    }, [signUpStatus, history, dispatch]);

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
            icon: <FiUser />,
            title: "firstname",
            label: "First Name",
            type: "text",
            id: 1,
        },
        {
            password: false,
            icon: <FiUser />,
            title: "lastname",
            label: "Last Name",
            type: "text",
            id: 2,
        },
        {
            password: false,
            icon: <FiMail />,
            title: "email",
            label: "Email Address",
            type: "text",
            id: 3,
        },
        {
            password: true,
            icon: <FiLock />,
            title: "password",
            label: "Password",
            type: "password",
            id: 4,
        },
        {
            password: true,
            icon: <FiLock />,
            title: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            id: 5,
        },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...authValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setErrors(ValidateInfo(authValues));
    };

    return (
        <Box className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formTitle}>
                    <h3>Welcome to Quantum</h3>
                    <p>Sign up to continue</p>
                </div>

                <AuthInputField
                    titles={formTitles}
                    change={handleChange}
                    errors={errors}
                    values={authValues}
                />
                <div className={styles.formFooterItems}>
                    <AuthDialog
                        buttonContent="Find password format?"
                        titles="Your password should have..."
                        content="A minimum 8 characters password contains a combination of
                        uppercase and lowercase letter, special character and number."
                    />
                </div>

                <div className={styles.formItems}>
                    <div className={styles.errorBox}>
                        {signUpStatus === "rejected" && (
                            <div className={styles.invalidField}>
                                <div className={styles.iconExclaimation}>
                                    <HiOutlineExclamation
                                        color="$authErrorColor"
                                        size="20px"
                                    />
                                </div>
                                An account with that email exists already!
                            </div>
                        )}
                    </div>
                    <button
                        className={styles.btn}
                        type="submit"
                        onSubmit={handleSubmit}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </Box>
    );
};

export default SignUp;
