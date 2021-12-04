export interface periodicCost {
    periodicType: string;
    cost: { $numberDecimal: string };
    date: string;
    nextPamentTime: string;
}

export interface accidentRecord {
    time: string;
    location: string;
    cost: { $numberDecimal: string };
    responsible: string;
    insurance: boolean;
}

export interface carBasicDetail {
    ID: string;
    Make: string;
    Year: number;
    Mile: string;
    Body: string;
    Color: string;
    Seats: number;
    Transmission: string;
    totalRentDay: number;
    dailyRent: string;
    cost: string;
    earn: string;
}

export interface NewCarBasicDetail {
    make: string;
    registerNumber: string;
    plate: string;
    year: number;
    miles: number;
    body: string;
    color: string;
    seats: number;
    transmission: string;
    totalRentDay: number;
    dailyRent: number;
    isNewVehicleUploaded?: string;
}

interface carDetails {
    ID: string;
    Make: string;
    Year: number;
    Mile: string;
    Body: string;
    Color: string;
    Seats: number;
    Transmission: string;
    totalRentDay: number;
    dailyRent: string;
    cost: string;
    earn: string;
    orderId: Array<string>;
    periodicCost: Array<periodicCost>;
    accidentRecord: Array<accidentRecord>;
}

export default carDetails;
