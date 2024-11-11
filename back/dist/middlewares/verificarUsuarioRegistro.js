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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarUsuarioRegistro = void 0;
const usersService_1 = require("../services/usersService");
const verificarUsuarioRegistro = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "Necesitas registrarte!" });
        }
        const user = yield (0, usersService_1.getUserByIdService)(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no registrado" });
        }
        next();
    }
    catch (_a) {
        return res
            .status(400)
            .json({ error: "Usuario inexistente. No se ha podido crear el turno" });
    }
});
exports.verificarUsuarioRegistro = verificarUsuarioRegistro;
