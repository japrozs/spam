import { truncate } from "./truncate";

export const generateReceiverList = (rec: string[]): string => {
    if (rec.length == 0) {
        return "Sent to 0 people";
    }
    let retVal = "Sent to ";
    retVal += '<span style="color : #000">' + rec[0] + "</span>";
    for (let i = 1; i < Math.min(rec.length, 2); i++) {
        retVal += ', <span style="color : #000">' + rec[i] + "</span>";
    }
    if (rec.length >= 3) {
        retVal += ` and <span style="color : #1B153A">${
            rec.length - 2
        } more </span>`;
    }
    return retVal;
};
