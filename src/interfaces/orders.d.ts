import { AxiosRequestConfig } from "axios";

export interface orderDetails {
    orderId: string;
    dailyCost: string;
    startDate: string;
    endDate: string;
    rentalDays: number;
    pickupLocation: string;
    dropoffLocation: string;
    total: string;
    status: string;
}

export interface orders {
    data: Array<orderDetails>;
}

export interface orderIds extends AxiosRequestConfig {
    ids: Array<string>;
}
