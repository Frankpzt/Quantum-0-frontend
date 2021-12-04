export interface IPeriodicCost {
    id: string;
    periodicCost: {
        periodicType: String;
        cost: Number;
        date: String;
        nextPaymentTime: String;
    };
    isPeriodicCostUploaded?: string;
}
