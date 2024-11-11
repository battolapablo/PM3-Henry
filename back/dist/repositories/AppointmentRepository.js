"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const Appointments_1 = require("../entities/Appointments");
const AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointments_1.Appointments);
exports.default = AppointmentRepository;
