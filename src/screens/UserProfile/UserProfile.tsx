import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FiEyeOff, FiEye, FiUser, FiMail, FiLock } from "react-icons/fi";
import {
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton,
} from "@mui/material";
import { useHistory } from "react-router";
import UserPhotos from "./UserPhotos";
import styles from "./UserProfile.module.scss";
import { UserProfileUpdater } from "../../models/userProfileSlice";
import { useAppSelector } from "../../hooks/redux";

const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const setSucceed = useAppSelector((state) => state.userProfile.setSucceed);
    const userFirstName =
        localStorage.getItem("userFirstName") ??
        "Please type in your first name";
    const userLastName =
        localStorage.getItem("userLastName") ?? "Please type in your last name";

    const userEmail = localStorage.getItem("userEmail");
    const [formValue, setFormValue] = useState({
        firstname: "",
        lastname: "",
        email: userEmail,
        phoneNumber: "",
        currentPassword: "",
        newPassword: "",
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        if (setSucceed) {
            // eslint-disable-next-line no-alert
            window.alert("update successfully");
        }
    }, [setSucceed]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        });
    };

    const handleClickShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleMouseDownContent = (event: { preventDefault: () => void }) => {
        event.preventDefault();
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        dispatch(UserProfileUpdater(formValue));
    };
    const handleLogOut = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        localStorage.removeItem("token");
        history.push("login");
    };

    return (
        <div className={styles.wrapper}>
            <UserPhotos />
            <form className={styles.userInfoForm}>
                <h3>Personal Information</h3>
                <div className={styles.userNameBox}>
                    <div className={styles.userNameContainer}>
                        <InputLabel
                            htmlFor="firstname"
                            className={styles.inputLabel}
                        >
                            First Name
                        </InputLabel>
                        <OutlinedInput
                            className={styles.userNameInputField}
                            type="text"
                            id="firstname"
                            name="firstname"
                            size="small"
                            value={formValue.firstname}
                            onChange={handleChange}
                            placeholder={userFirstName}
                            startAdornment={
                                <InputAdornment position="start">
                                    <FiUser />
                                </InputAdornment>
                            }
                        />
                    </div>
                    <div className={styles.userNameContainer}>
                        <InputLabel
                            htmlFor="lastname"
                            className={styles.inputLabel}
                        >
                            Last Name
                        </InputLabel>
                        <OutlinedInput
                            className={styles.userNameInputField}
                            type="text"
                            id="lastname"
                            name="lastname"
                            size="small"
                            value={formValue.lastname}
                            onChange={handleChange}
                            placeholder={userLastName}
                            startAdornment={
                                <InputAdornment position="start">
                                    <FiUser />
                                </InputAdornment>
                            }
                        />
                    </div>
                </div>
                <div className={styles.emailBox}>
                    <InputLabel
                        htmlFor="emailAddress"
                        className={styles.inputLabel}
                    >
                        Email Address
                    </InputLabel>
                    <div className={styles.emailContainer} id="emailAddress">
                        <FiMail className={styles.fimail} />
                        {userEmail}
                    </div>
                </div>
                <div className={styles.userInfoBox}>
                    <InputLabel
                        htmlFor="phoneNumber"
                        className={styles.inputLabel}
                    >
                        Phone Number
                    </InputLabel>
                    <OutlinedInput
                        className={styles.userInfoInput}
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formValue.phoneNumber}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <FiUser />
                            </InputAdornment>
                        }
                    />
                </div>
                <div className={styles.lineSeparator} />
                <h3>Password Management</h3>
                <div className={styles.userInfoBox}>
                    <InputLabel
                        htmlFor="currentPassword"
                        className={styles.inputLabel}
                    >
                        Current Password
                    </InputLabel>
                    <OutlinedInput
                        className={styles.userInfoInput}
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={formValue.currentPassword}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <FiLock />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle to show content"
                                    onClick={handleClickShowCurrentPassword}
                                    onMouseDown={handleMouseDownContent}
                                    edge="end"
                                >
                                    {showCurrentPassword ? (
                                        <FiEye />
                                    ) : (
                                        <FiEyeOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className={styles.userInfoBox}>
                    <InputLabel
                        htmlFor="newPassword"
                        className={styles.inputLabel}
                    >
                        New Password
                    </InputLabel>
                    <OutlinedInput
                        className={styles.userInfoInput}
                        type={showNewPassword ? "password" : "text"}
                        id="newPassword"
                        name="newPassword"
                        value={formValue.newPassword}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <FiLock />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle to show content"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownContent}
                                    edge="end"
                                >
                                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.formButton}
                        id="formButton"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                    <button
                        className={styles.formButton}
                        id="formButton"
                        type="button"
                        onClick={handleLogOut}
                    >
                        Log out
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;
