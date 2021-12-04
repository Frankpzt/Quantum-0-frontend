import request from "../utils/request";

const getAllTasksByYearAndMonth = (year: number, month: number) =>
    request({
        url: `task/year/${year}/month/${month}`,
        method: "GET",
    });

export default getAllTasksByYearAndMonth;
