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
exports.confirmUser = exports.loginUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const usersService_1 = require("../services/usersService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        if (!name || !email || !birthdate || !nDni || !username || !password) {
            return res.status(400).json({ message: "Faltan datos por completar!!" });
        }
        const newUser = yield (0, usersService_1.createUserService)({
            name,
            email,
            birthdate,
            nDni,
            username,
            password,
        });
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: "Los datos son incorrectos!" });
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersService_1.getUserByIdService)(Number(id));
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});
exports.getUserById = getUserById;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Usuario y contraseña son requeridos." });
    }
    try {
        const credential = yield CredentialRepository_1.default.findOne({
            where: { username, password },
        });
        if (!credential) {
            return res
                .status(400)
                .json({ message: "El usuario o contraseña son incorrectos." });
        }
        const user = yield UserRepository_1.default.findOne({
            where: { credentials: { id: credential.id } },
            relations: ["credentials"],
        });
        if (!user) {
            return res
                .status(400)
                .json({ message: "El usuario o contraseña son incorrectos." });
        }
        if (!user.confirmed) {
            return res
                .status(400)
                .json({ message: "La cuenta no ha sido confirmada aún." });
        }
        return res.status(200).json({ login: true, user: user });
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: "Los datos ingresados son incorrectos" });
    }
});
exports.loginUser = loginUser;
const confirmUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "tu-secreto");
        yield (0, usersService_1.confirmUserService)(decoded.userId);
        res.status(200).json({ message: "Cuenta confirmada exitosamente." });
    }
    catch (error) {
        res.status(400).json({ message: "Token inválido o expirado." });
    }
});
exports.confirmUser = confirmUser;
