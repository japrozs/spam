import juice from "juice";

const styleString = `.post_body>*{font-family:"Helvetica Neue";}.post_body a{/* color:rgb(95, 95, 223);/color:#48bb78;}.post_body a:hover{color: #38a169;}.post_body h1{font-size: 40px;}.post_body h1{font-weight: 500;}.post_body code,pre{font-family: "Menlo" !importan;background-color: #efefe;margin: 5px !importan;padding: 2px 5p;overflow-y: aut;border-radius: 0.2rem;}`;

export const addStyles = (body) => {
    const doc = juice(`<style>${styleString}</style>${body}`);
    return doc;
};
