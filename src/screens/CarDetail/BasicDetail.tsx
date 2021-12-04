import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "./CarDetail.module.scss";
import car from "../../assets/images/CarDetail/car1.jpeg";
import TextField from "../../components/TextField/TextField";
import { carBasicDetail } from "../../interfaces/carBasicDetail";
import { useAppSelector } from "../../hooks/redux";

const itemData: { img: string; title: string; active: boolean }[] = [
    { img: car, title: "Car1", active: true },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "bb1",
        active: false,
    },
    { img: car, title: "Car3", active: false },
    { img: car, title: "Car4", active: false },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "bb2",
        active: false,
    },
];

function BasicDetail() {
    const [imageData, setImageData] = useState(itemData);
    const [displayedImg, setDisplayedImg] = useState({
        img: imageData[0].img,
        title: imageData[0].title,
    });
    const [imageIndex, setImageIndex] = useState(0);
    const [isUpButtonVisible, setIsUpButtonVisible] = useState(true);
    const [isDownButtonVisible, setIsDownButtonVisible] = useState(false);
    const vehicleDetails = useAppSelector((state) => state.vehicle);
    useEffect(() => {
        // if the last displayed image index is equal to image list length, hide DOWN button.
        if (imageIndex + 3 === imageData.length) {
            setIsDownButtonVisible(true);
        } else {
            setIsDownButtonVisible(false);
        }
        // if displayed image index is larger than 0, show UP button, and vice versa.
        if (imageIndex > 0) {
            setIsUpButtonVisible(false);
        } else if (imageIndex === 0) {
            setIsUpButtonVisible(true);
        }
    }, [imageIndex, imageData.length]);

    //  get vehicle info
    const changeDisplay = (event: React.MouseEvent<HTMLButtonElement>) => {
        const element = event.target as HTMLImageElement;
        setDisplayedImg({
            img: element.src,
            title: element.alt,
        });
        setImageData(
            imageData.map(
                (img: { img: string; title: string; active: boolean }) => {
                    const imgObj = img;
                    imgObj.active = false;
                    if (imgObj.title === element.alt) {
                        imgObj.active = true;
                    }
                    return imgObj;
                }
            )
        );
    };

    const handleUp = () => {
        setImageIndex(imageIndex - 1);
    };

    const handleDown = () => {
        setImageIndex(imageIndex + 1);
    };

    return (
        <div className={styles.basicDetail}>
            <div className={styles.imageField}>
                <img
                    className={styles.imageDisplay}
                    src={displayedImg.img}
                    alt={displayedImg.title}
                />
                <div className={styles.imageList}>
                    <button
                        className={isUpButtonVisible ? styles.inactive : ""}
                        type="button"
                        onClick={handleUp}
                    >
                        <FiChevronUp className={styles.up} />
                    </button>

                    {imageData.slice(imageIndex, imageIndex + 3).map((item) => (
                        <button
                            onClick={changeDisplay}
                            type="button"
                            key={item.title}
                        >
                            <img
                                className={item.active ? styles.active : ""}
                                src={item.img}
                                alt={item.title}
                            />
                        </button>
                    ))}
                    {itemData.length > 3 && (
                        <button
                            className={
                                isDownButtonVisible ? styles.inactive : ""
                            }
                            type="button"
                            onClick={handleDown}
                        >
                            <FiChevronDown className={styles.down} />
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.basicContent}>
                <h2>Basic Detial</h2>
                <div className={styles.flexbox}>
                    {Object.keys(vehicleDetails).map((key, index) => {
                        if (index < 8) {
                            return (
                                <div key={key} className={styles.formControl}>
                                    <TextField
                                        id={key}
                                        label={key}
                                        value={
                                            vehicleDetails[
                                                key as keyof carBasicDetail
                                            ]
                                        }
                                        disabled
                                    />
                                </div>
                            );
                        }
                        return "";
                    })}
                </div>
                <hr />
                <div className={styles.flexbox}>
                    {Object.keys(vehicleDetails).map((key, index) => {
                        if (index >= 8 && index < 12) {
                            return (
                                <div key={key} className={styles.formControl}>
                                    <TextField
                                        id={key}
                                        label={key}
                                        value={
                                            vehicleDetails[
                                                key as keyof carBasicDetail
                                            ]
                                        }
                                        disabled
                                    />
                                </div>
                            );
                        }
                        return "";
                    })}
                </div>
            </div>
        </div>
    );
}

export default BasicDetail;
