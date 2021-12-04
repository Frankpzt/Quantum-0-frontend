import axios, { AxiosRequestConfig } from "axios";

const baseURL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8080/api/"
        : "http://3.25.84.1/api";
const timeout = 30000;
const userToken = localStorage.getItem("token") ?? null;
const userEmail = localStorage.getItem("userEmail") ?? null;

/**
 * Requests a path, returning a promise.
 *
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(options: AxiosRequestConfig) {
    const axiosInstance = axios.create({
        baseURL,
        timeout,
        headers: {
            authorization: `Bearer ${userToken}`,
            userEmail,
        },
    });

    return axiosInstance(options);
}
