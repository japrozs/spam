import { CheerioAPI } from "cheerio";

export const setStyles = (doc: CheerioAPI, tag, styles) => {
    doc(tag).prop("style", styles);
};
