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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const Appointments_1 = require("../entities/Appointments");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield AppointmentRepository_1.default.find();
        if (appointments.length === 0) {
            throw new Error("No se encontraron turnos");
        }
        return appointments;
    }
    catch (error) {
        console.error("Error al obtener los turnos:", error);
        throw new Error("Error al obtener los turnos");
    }
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const appointment = yield queryRunner.manager.findOne(Appointments_1.Appointments, {
            relations: ["user"],
            where: { id },
        });
        if (!appointment) {
            throw new Error(`Turno no encontrado con ID: ${id}`);
        }
        yield queryRunner.commitTransaction();
        return appointment;
    }
    catch (error) {
        console.error(`El turno con ID ${id} no existe`);
        yield queryRunner.rollbackTransaction();
        throw new Error("Error al obtener el turno. Inténtelo nuevamente.");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const newAppointment = AppointmentRepository_1.default.create(appointmentData);
        yield AppointmentRepository_1.default.save(newAppointment);
        const user = yield UserRepository_1.default.findById(appointmentData.userId);
        newAppointment.user = user;
        yield queryRunner.manager.save(newAppointment);
        yield queryRunner.commitTransaction();
        return newAppointment;
    }
    catch (error) {
        console.log("Usuario inexistente. No se ha podido crear el turno");
        yield queryRunner.rollbackTransaction();
        throw new Error();
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof id !== "number" || id <= 0) {
        throw new Error("ID de turno inválido");
    }
    try {
        const appointment = yield AppointmentRepository_1.default.findOneBy({ id });
        if (!appointment) {
            throw new Error("Turno no encontrado");
        }
        appointment.status = "Cancelado";
        yield AppointmentRepository_1.default.save(appointment);
        return appointment;
    }
    catch (error) {
        console.error(`Error al cancelar el turno con ID ${id}:`);
        throw new Error("El turno que intentas cancelar no existe");
    }
});
exports.cancelAppointmentService = cancelAppointmentService;
