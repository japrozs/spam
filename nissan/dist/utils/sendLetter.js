"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLetter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.sendLetter = (email, body, title) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "qkfrnkvqiykpx47v@ethereal.email",
            pass: "WpgRF2Rnz3jCFq8QYQ",
        },
    });
    let info = yield transporter.sendMail({
        from: "<spam@gmail.com>",
        to: email,
        subject: title,
        html: body,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
});
//# sourceMappingURL=sendLetter.js.map