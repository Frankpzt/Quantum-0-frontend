export interface INewOrder {
    rentalCost: number;
    rentPerDay: number;
    startDate: string;
    endDate: string;
    pickUpLocation: string;
    dropOffLocation: string;
    status: string;
    vehicleId: string;
    isNewOrderUploaded: string;
}
