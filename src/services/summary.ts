import request from "../utils/request";

function getAllVehicles() {
    return request({
        method: "GET",
        url: "/vehicle",
    });
}

function getCarStock() {
    return request({
        method: "GET",
        url: "/stock",
    });
}

function getTotalProfit() {
    return request({
        method: "GET",
        url: "/revenue",
    });
}

function getMonthProfit() {
    return request({
        method: "GET",
        url: "/revenue/monthProfit",
    });
}

export { getAllVehicles, getCarStock, getTotalProfit, getMonthProfit };
