import { IAccidentRecord } from "../interfaces/accidentRecord";
import request from "../utils/request";

function sendAccidentRecord(payload: IAccidentRecord) {
    const { id } = payload;
    return request({
        url: `vehicle/accidentRecord/${id}`,
        method: "PUT",
        data: payload,
    });
}

export default sendAccidentRecord;
