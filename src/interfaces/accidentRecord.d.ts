export interface IAccidentRecord {
    id: string;
    accidentRecord: {
        time: string;
        location: string;
        cost?: number;
        responsible?: string;
        insurance?: string;
        relatedOrder?: string;
        description?: string;
    };
    isAccidentRecordUploaded?: string;
}
