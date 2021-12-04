import { IPeriodicCost } from "../interfaces/periodicCost";
import request from "../utils/request";

function sendPeriodicCost(payload: IPeriodicCost) {
    const { id } = payload;
    return request({
        url: `vehicle/periodicCost/${id}`,
        method: "PUT",
        data: payload,
    });
}

export default sendPeriodicCost;
