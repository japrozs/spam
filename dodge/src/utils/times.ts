export const times = (symb: string, times: number) => {
    let str = "";
    for (let i = 0; i < times; i++) {
        str += symb;
    }
    return str;
};
