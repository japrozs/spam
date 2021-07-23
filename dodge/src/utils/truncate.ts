export const truncate = (str: string, len: number) => {
    if (str.length > len) {
        return str.substring(0, len) + "...";
    }
    return str;
};
