import { INewOrder } from "../interfaces/newOrder";
import request from "../utils/request";

function sendNewOrder(payload: INewOrder) {
    return request({
        url: `order`,
        method: "POST",
        data: payload,
    });
}

export default sendNewOrder;
