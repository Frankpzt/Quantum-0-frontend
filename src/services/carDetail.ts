import request from "../utils/request";
import { NewCarBasicDetail } from "../interfaces/carBasicDetail";

export const createNewVehicle = (payload: NewCarBasicDetail) =>
    request({
        url: "vehicle",
        method: "POST",
        data: payload,
    });

const getVehicleDetailById = (vehicleId: string) =>
    request({
        url: `vehicle/${vehicleId}`,
        method: "GET",
    });

export default getVehicleDetailById;
