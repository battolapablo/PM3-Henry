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
exports.preloadAppointmentData = exports.preloadUserData = void 0;
const data_source_1 = require("../config/data-source");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const preloadUserData_1 = require("../helpers/preloadUserData");
const preloadAppointmentData_1 = require("./preloadAppointmentData");
const preloadUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    if (preloadUserData_1.userPreload.length === 0) {
        console.log("No hay usuarios en el arreglo userPreload. La precarga no se realizará.");
        return;
    }
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const userPromises = preloadUserData_1.userPreload.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = UserRepository_1.default.create(user);
            return queryRunner.manager.save(newUser);
        }));
        yield Promise.all(userPromises);
        yield queryRunner.commitTransaction();
        console.log("Precarga de usuarios realizada con éxito");
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        console.log("Error al intentar crear los usuarios:", error);
    }
    finally {
        console.log("Ha finalizado el intento de precarga de usuarios");
        yield queryRunner.release();
    }
});
exports.preloadUserData = preloadUserData;
const preloadAppointmentData = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    const promises = preloadAppointmentData_1.appointmentPreload.map((appointment) => __awaiter(void 0, void 0, void 0, function* () {
        const newAppointment = yield AppointmentRepository_1.default.create(appointment);
        yield queryRunner.manager.save(newAppointment);
        const user = yield UserRepository_1.default.findOneBy({ id: appointment.userId });
        if (!user)
            throw Error("Usuario inexistente");
        newAppointment.user = user;
        yield queryRunner.manager.save(newAppointment);
    }));
    try {
        yield queryRunner.startTransaction();
        yield Promise.all(promises);
        yield queryRunner.commitTransaction();
        console.log("Precarga de turnos realizada con éxito");
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        console.log("Error al intentar crear los turnos");
    }
    finally {
        console.log("Ha finalizado el intento de pre carga");
        yield queryRunner.release();
    }
});
exports.preloadAppointmentData = preloadAppointmentData;
