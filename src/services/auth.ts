import request from "../utils/request";
import { IAuthFormValues } from "../interfaces/redux";

function signUp(payload: IAuthFormValues) {
    return request({
        url: "users",
        method: "POST",
        data: payload,
    });
}

function login(payload: IAuthFormValues) {
    return request({
        url: "login",
        method: "POST",
        data: payload,
    });
}

function logout(): void {
    localStorage.removeItem("token");
}

export { signUp, login, logout };
