import request from "../utils/request";

const getVehicleIdByPlate = (plate: string) =>
    request({
        url: `vehicle/plateToId/${plate}`,
        method: "GET",
    });

export default getVehicleIdByPlate;
