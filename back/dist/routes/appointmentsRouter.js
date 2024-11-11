"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentsRouter = void 0;
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const verificarUsuarioRegistro_1 = require("../middlewares/verificarUsuarioRegistro");
const CatchAsync_1 = __importDefault(require("../middlewares/CatchAsync"));
exports.appointmentsRouter = (0, express_1.Router)();
exports.appointmentsRouter.get("/appointments", appointmentsController_1.getAllAppointments);
exports.appointmentsRouter.get("/appointments/:id", appointmentsController_1.getAppointmentById);
exports.appointmentsRouter.post("/appointments/schedule", verificarUsuarioRegistro_1.verificarUsuarioRegistro, (0, CatchAsync_1.default)(appointmentsController_1.createAppointment));
exports.appointmentsRouter.put("/appointments/cancel/:id", appointmentsController_1.cancelAppointment);
exports.default = exports.appointmentsRouter;
