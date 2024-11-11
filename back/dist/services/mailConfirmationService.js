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
exports.generateConfirmationToken = exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../config/envs");
const sendConfirmationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "Hotmail",
        auth: {
            user: "pablod_ferrero@hotmail.com",
            pass: envs_1.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: "pablod_ferrero@hotmail.com",
        to: email,
        subject: "Confirma tu cuenta",
        text: `Por favor confirma tu cuenta haciendo clic en el siguiente enlace: 
    http://localhost:3000/confirm/${token}`,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Correo de confirmación enviado");
    }
    catch (error) {
        console.error("Error al enviar el correo de confirmación:", error);
    }
});
exports.sendConfirmationEmail = sendConfirmationEmail;
const generateConfirmationToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, "tu-secreto", { expiresIn: "1h" });
    return token;
};
exports.generateConfirmationToken = generateConfirmationToken;
