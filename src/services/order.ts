import request from "../utils/request";
import { orderIds } from "../interfaces/orders";

const getOrderByIds = (ids: orderIds) =>
    request({
        url: "order/multiple",
        method: "POST",
        data: ids,
    });

export default getOrderByIds;
