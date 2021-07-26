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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(to, html, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        let info = yield transporter.sendMail({
            from: "sainifamily003@gmail.com",
            to,
            subject: type == "change" ? "Change your Spam Password" : "Verify your email adress",
            html,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map