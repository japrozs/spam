export const extractEmails = (receivers: string) => {
    receivers = receivers.trim();
    const emails = receivers.split(",");
    return emails;
};
