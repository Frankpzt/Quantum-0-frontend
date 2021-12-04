import request from "../utils/request";
import { IUserProfile } from "../interfaces/redux";

export default function updateUserProfile(payload: IUserProfile) {
    return request({
        url: "users",
        method: "PUT",
        data: payload,
    });
}
