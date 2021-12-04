import { IconType } from "react-icons";
import { FiFileText, FiTruck, FiArchive, FiCalendar } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";

interface INavigationContentElement {
    id: number;
    menuIcon: IconType;
    menuName: string;
    router: string;
}

const navigationContent: INavigationContentElement[] = [
    {
        id: 0,
        menuIcon: FiFileText,
        menuName: "Dashboard",
        router: "/",
    },
    {
        id: 1,
        menuIcon: FiTruck,
        menuName: "Inventory",
        router: "/inventory",
    },
    {
        id: 2,
        menuIcon: FiArchive,
        menuName: "Order History",
        router: "/orderHistory",
    },
    {
        id: 3,
        menuIcon: FiCalendar,
        menuName: "Calendar",
        router: "/calendar",
    },
    {
        id: 4,
        menuIcon: RiAccountCircleLine,
        menuName: "User Profile",
        router: "/userProfile",
    },
];

export default navigationContent;
