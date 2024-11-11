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
exports.verifyCredentialService = exports.createCredentialService = void 0;
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const createCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCredential = CredentialRepository_1.default.create({ username, password });
        yield CredentialRepository_1.default.save(newCredential);
        if (newCredential) {
            return newCredential;
        }
        else {
            throw new Error("Error al crear la credencial");
        }
    }
    catch (error) {
        console.error("Error al crear la credencial:", error);
        throw new Error("Error al crear la credencial");
    }
});
exports.createCredentialService = createCredentialService;
const verifyCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof username !== "string" || username.trim() === "") {
        throw new Error("Nombre de usuario inválido");
    }
    if (typeof password !== "string" || password.trim() === "") {
        throw new Error("Contraseña inválida");
    }
    try {
        const credential = yield CredentialRepository_1.default.findOneBy({
            username,
            password,
        });
        if (!credential) {
            throw new Error("Credencial no encontrada");
        }
        return credential;
    }
    catch (error) {
        console.error("Error al verificar la credencial:");
        throw new Error("Error al verificar la credencial");
    }
});
exports.verifyCredentialService = verifyCredentialService;
