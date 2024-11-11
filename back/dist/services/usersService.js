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
exports.confirmUserService = exports.loginUserService = exports.getUserByIdService = exports.createUserService = exports.getAllUsersService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const credentialService_1 = require("./credentialService");
const mailConfirmationService_1 = require("./mailConfirmationService");
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const users = yield queryRunner.manager.find(User_1.User, {
            relations: {
                appointment: true
            },
        });
        if (!users || users.length === 0) {
            throw new Error("No se encontraron usuarios");
        }
        yield queryRunner.commitTransaction();
        return users;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        console.error("Error al buscar los usuarios:", error);
        throw new Error("No se pudo obtener los usuarios. Inténtelo nuevamente.");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.getAllUsersService = getAllUsersService;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    if (!userData.name ||
        !userData.email ||
        !userData.password ||
        !userData.birthdate ||
        !userData.nDni ||
        !userData.username) {
        throw new Error("Nombre, correo electrónico y contraseña son requeridos.");
    }
    try {
        yield queryRunner.startTransaction();
        const newCredential = yield (0, credentialService_1.createCredentialService)(userData.username, userData.password);
        const newUserData = {
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni,
            credentials: newCredential,
            confirmed: false
        };
        const user = UserRepository_1.default.create(newUserData);
        const result = yield UserRepository_1.default.save(user);
        const token = (0, mailConfirmationService_1.generateConfirmationToken)(String(result.id));
        yield (0, mailConfirmationService_1.sendConfirmationEmail)(userData.email, token);
        yield queryRunner.commitTransaction();
        return result;
    }
    catch (error) {
        console.log("Error al crear usuario, faltan datos o alguno de ellos son incorrectos");
        yield queryRunner.rollbackTransaction();
        throw new Error("Error al crear usuario. Inténtelo nuevamente.");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createUserService = createUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const user = yield UserRepository_1.default.findById(id);
        if (!user) {
            throw new Error(`Usuario no encontrado con ID: ${id}`);
        }
        yield queryRunner.commitTransaction();
        return user;
    }
    catch (error) {
        console.error(`El usuario con ID: ${id} no existe.`);
        yield queryRunner.rollbackTransaction();
        throw new Error(`No se pudo obtener el usuario. Inténtelo nuevamente.`);
    }
    finally {
        yield queryRunner.release();
    }
});
exports.getUserByIdService = getUserByIdService;
const loginUserService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = yield (0, credentialService_1.verifyCredentialService)(username, password);
        if (!credential) {
            return { login: false };
        }
        const user = yield UserRepository_1.default.findOne({
            where: { credentials: { id: credential.id } },
            relations: ["credentials"],
        });
        if (!user || !user.confirmed) {
            return { login: false };
        }
        return {
            login: true,
            user: user,
        };
    }
    catch (error) {
        throw new Error("Error al intentar iniciar sesión");
    }
});
exports.loginUserService = loginUserService;
const confirmUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
        throw new Error("ID de usuario inválido");
    }
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const user = yield UserRepository_1.default.findOne({ where: { id: numericUserId } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        if (user.confirmed) {
            throw new Error("La cuenta ya está confirmada");
        }
        user.confirmed = true;
        const updatedUser = yield UserRepository_1.default.save(user);
        yield UserRepository_1.default.save(updatedUser);
        yield queryRunner.commitTransaction();
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        console.error("Error al confirmar usuario:", error);
        throw new Error("Error al confirmar usuario. Inténtelo nuevamente.");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.confirmUserService = confirmUserService;
