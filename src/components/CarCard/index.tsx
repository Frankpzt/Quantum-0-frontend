import React from "react";
import { NavLink } from "react-router-dom";
import carDetails from "../../interfaces/carBasicDetail";
import cardStyles from "./CarCard.module.scss";

interface Details {
    cars: carDetails[];
}

const CarCard: React.FC<Details> = ({ cars }) => (
    <div className={cardStyles.box}>
        <div className={cardStyles.container}>
            {cars.map((car, index) => {
                const path = {
                    pathname: "carDetail",
                    search: car.ID,
                };
                return (
                    <div key={car.ID} className={cardStyles.card}>
                        <NavLink to={path}>
                            <div className={cardStyles.background} />
                            <div className={cardStyles.details}>
                                <ul>
                                    <li>ID</li>
                                    <li>Make&Model</li>
                                    <li>Body</li>
                                    <li>Color</li>
                                    <li>Seats</li>
                                </ul>
                                <ul className={cardStyles["details-left"]}>
                                    <li className={cardStyles.info}>{index}</li>
                                    <li className={cardStyles.info}>
                                        {car.Make}
                                    </li>
                                    <li className={cardStyles.info}>
                                        {car.Body}
                                    </li>
                                    <li className={cardStyles.info}>
                                        {car.Color}
                                    </li>
                                    <li className={cardStyles.info}>
                                        {car.Seats}
                                    </li>
                                </ul>
                                <ul>
                                    <li>transmission</li>
                                    <li>Total rent day</li>
                                    <li>Daily Rent</li>
                                    <li>Cost</li>
                                    <li>Earn</li>
                                </ul>
                                <ul>
                                    <li className={cardStyles.info}>
                                        {car.Transmission}
                                    </li>
                                    <li className={cardStyles.info}>
                                        {car.totalRentDay}
                                    </li>
                                    <li className={cardStyles.info}>
                                        <span className={cardStyles.currency}>
                                            AUD
                                        </span>
                                        {car.dailyRent}
                                    </li>
                                    <li className={cardStyles.info}>
                                        <span className={cardStyles.currency}>
                                            AUD
                                        </span>
                                        {car.cost}
                                    </li>
                                    <li className={cardStyles.info}>
                                        <span className={cardStyles.currency}>
                                            AUD
                                        </span>
                                        {car.earn}
                                    </li>
                                </ul>
                            </div>
                        </NavLink>
                    </div>
                );
            })}
        </div>
    </div>
);

export default CarCard;
