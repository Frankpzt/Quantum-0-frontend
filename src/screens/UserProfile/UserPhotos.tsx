import React from "react";
import styles from "./UserPhoto.module.scss";

function UserPhotos() {
    const userName = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar") || "";
    return (
        <div className={styles.userPhoto}>
            <div className={styles.photoDisplayBox}>
                <img src={avatar} alt="avatar" />
            </div>
            <div className={styles.userNameContainer}>
                <p>{userName}</p>
                <button className={styles.uploadPhotoButton} type="submit">
                    Upload
                </button>
            </div>
        </div>
    );
}

export default UserPhotos;
