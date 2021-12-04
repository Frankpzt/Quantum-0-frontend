import request from "../utils/request";

const getAllVehicles = () =>
    request({
        url: `vehicle`,
        method: "GET",
    });

export default getAllVehicles;
