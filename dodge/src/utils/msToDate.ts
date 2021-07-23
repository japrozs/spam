export const msToDate = (ms: string) => {
    const t = parseInt(ms);
    const d = new Date(t).toISOString();
    return d;
};
