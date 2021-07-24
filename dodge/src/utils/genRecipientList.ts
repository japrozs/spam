export const genRecipientList = (data) => {
    let recs = {};
    data.map((p) => {
        p.receivers.map((e) => {
            recs[e.trim()] = new Date().getMilliseconds();
        });
    });
    const arr = [];
    Object.keys(recs).forEach((k) => {
        arr.push({ email: k, id: arr[k] });
    });
    return arr;
};
