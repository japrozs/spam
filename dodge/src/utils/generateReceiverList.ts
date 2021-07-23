import { truncate } from "./truncate";

export const generateReceiverList = (rec: string[]): string => {
    if (rec.length == 0) {
        return "Sent to 0 people";
    }
    let retVal = "Sent to ";
    retVal += rec[0];
    for (let i = 1; i < Math.min(rec.length, 2); i++) {
        retVal += ", " + rec[i];
    }
    if (rec.length >= 3) {
        retVal += ` and ${rec.length - 2} more.`;
    }
    return retVal;
};
