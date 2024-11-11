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
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appoinmentsService_1 = require("../services/appoinmentsService");
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appoinmentsService_1.getAllAppointmentsService)();
        res.status(200).json(appointments);
    }
    catch (err) {
        res.status(500).json({ error: "Error al obtener los turnos" });
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointmentId = parseInt(id, 10);
        const appointment = yield (0, appoinmentsService_1.getAppointmentByIdService)(appointmentId);
        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(404).json({ error: "Turno no encontrado" });
        }
    }
    catch (err) {
        res.status(404).json({ error: "Turno no encontrado" });
    }
});
exports.getAppointmentById = getAppointmentById;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, date, time, reason } = req.body;
        if (!userId || !date || !time || !reason) {
            return res
                .status(400)
                .json({ error: "Todos los campos son obligatorios" });
        }
        const newAppointment = yield (0, appoinmentsService_1.createAppointmentService)({
            userId,
            date,
            time,
            reason,
            status: "Activo",
        });
        res.status(201).json(newAppointment);
    }
    catch (err) {
        res.status(400).json({
            error: "Error al crear el turno, algunos datos son incorrectos",
        });
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointmentId = parseInt(id, 10);
        if (isNaN(appointmentId)) {
            return res
                .status(400)
                .json({ error: "El ID proporcionado no es válido" });
        }
        const appointment = yield (0, appoinmentsService_1.cancelAppointmentService)(appointmentId);
        if (appointment) {
            res.status(200).json({ message: "Turno cancelado con éxito" });
        }
        else {
            res.status(404).json({ error: "Turno no encontrado" });
        }
    }
    catch (err) {
        res.status(404).json({ message: "Turno no encontrado" });
    }
});
exports.cancelAppointment = cancelAppointment;
