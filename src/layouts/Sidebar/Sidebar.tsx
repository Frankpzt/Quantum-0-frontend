/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./sidebar.module.scss";
import SideListDiv from "./components/Sidelistdiv";

interface sideProps {
    IsNavigationUnfolded: boolean;
    setIsNavigationUnfolded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<sideProps> = ({
    IsNavigationUnfolded,
    setIsNavigationUnfolded,
}: sideProps) => {
    function handleNavigation(): void {
        setIsNavigationUnfolded((prevState: any) => !prevState);
    }
    return (
        <>
            <nav
                className={
                    IsNavigationUnfolded
                        ? styles.sidebar
                        : styles["sidebar--collapsed"]
                }
            >
                <div
                    className={
                        IsNavigationUnfolded
                            ? styles.sideWrapper
                            : styles["sideWrapper--collapsed"]
                    }
                >
                    <div
                        className={
                            IsNavigationUnfolded
                                ? styles.sideWrapper__navBtn
                                : styles["sideWrapper__navBtn--collapsed"]
                        }
                    >
                        {IsNavigationUnfolded && (
                            <button
                                type="button"
                                className={styles.sideWrapper__navBtn__arrowBtn}
                                onClick={() => {
                                    handleNavigation();
                                }}
                            >
                                <FiChevronLeft />
                                Hide
                            </button>
                        )}
                        {!IsNavigationUnfolded && (
                            <button
                                type="button"
                                className={styles.sideWrapper__navBtn__arrowBtn}
                                onClick={() => {
                                    handleNavigation();
                                }}
                            >
                                <FiChevronRight />
                                Show
                            </button>
                        )}
                    </div>
                    <ul
                        className={
                            IsNavigationUnfolded
                                ? styles.sideMenu
                                : styles["sideMenu--collapsed"]
                        }
                    >
                        <SideListDiv
                            IsNavigationUnfolded={IsNavigationUnfolded}
                        />
                    </ul>
                </div>
            </nav>
        </>
    );
};
export default Sidebar;
