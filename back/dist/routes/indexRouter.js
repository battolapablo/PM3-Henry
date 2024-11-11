"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsRouter_1 = require("./appointmentsRouter");
const usersRouter_1 = require("./usersRouter");
const indexRouter = (0, express_1.Router)();
indexRouter.use("/appointments", appointmentsRouter_1.appointmentsRouter);
indexRouter.use("/users", usersRouter_1.usersRouter);
exports.default = indexRouter;
