import { INewTask } from "../interfaces/newTask";
import request from "../utils/request";

function sendNewTask(payload: INewTask) {
    return request({
        url: `task`,
        method: "POST",
        data: payload,
    });
}

export default sendNewTask;
