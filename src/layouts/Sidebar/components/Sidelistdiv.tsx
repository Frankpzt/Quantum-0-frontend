import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../sidebar.module.scss";
import navigationContent from "./Sidelistcontent";

interface ISideListDivProps {
    IsNavigationUnfolded: boolean;
}
const SideListDiv: React.FC<ISideListDivProps> = ({ IsNavigationUnfolded }) => (
    <>
        {navigationContent.map((value) => (
            <NavLink
                to={value.router}
                className={styles.menuItem}
                key={value.id}
            >
                <div className={styles.menuIcon}>
                    <div className="icon">
                        <value.menuIcon size={20} />
                    </div>
                </div>
                {IsNavigationUnfolded && (
                    <div className={styles.menuName}>{value.menuName}</div>
                )}
            </NavLink>
        ))}
    </>
);
export default SideListDiv;
